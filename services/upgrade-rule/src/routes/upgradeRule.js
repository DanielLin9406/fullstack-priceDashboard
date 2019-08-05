import upgradeRuleRouter from '../libs/router/router';
import upgradeRule from '../db/upgradeRule_db.json';

upgradeRuleRouter.get('/upgraderule', async (req, res) => {
  res.send(JSON.stringify(upgradeRule));
});

export default upgradeRuleRouter;
