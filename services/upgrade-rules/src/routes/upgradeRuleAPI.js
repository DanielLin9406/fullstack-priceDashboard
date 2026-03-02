import createRouter from '../../../shared/libs/router/router';
import UpgradeRuleModel from '../model/upgradeRuleModel';
import ensureAuthenticated from '../libs/auth/authorization';
import client from '../db/mongo/redis';

const upgradeRuleRouter = createRouter();


upgradeRuleRouter.get(
  '/upgrade-rules',
  ensureAuthenticated,
  async (req, res) => {
    const data = await UpgradeRuleModel.find({});

    const ruleObj = data.reduce((acc, cur) => {
      const upgradeArr = cur.upgrade;
      const upgradeObj = upgradeArr.reduce((acc2, cur2) => {
        acc2[cur2.name] = cur2.deduct;
        return acc2;
      }, {});
      return Object.assign(acc, {
        [cur.name]: { ...cur._doc, upgrade: upgradeObj }
      });
    }, {});

    const cachValue = await client.hget('upgradeRule', 'upgradeRuleField');
    if (cachValue) {
      console.log('read upgrade rule from cache');
      return res.send(cachValue);
    }

    client.hset(
      'upgradeRule',
      'upgradeRuleField',
      JSON.stringify(ruleObj),
      'EX',
      10
    );

    return res.send(JSON.stringify(ruleObj));
  }
);

export default upgradeRuleRouter;
