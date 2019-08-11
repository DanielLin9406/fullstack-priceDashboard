import promotionRouter from '../libs/router/router';
import PromotionsModel from '../model/promotionsModel';
import ensureAuthenticated from '../libs/auth/authorization';
import redis from 'redis';
import util from 'util';
import keys from '../config/keys';
// import promotion from '../db/promotions_db.json';

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
client.hget = util.promisify(client.hget);

function object2Arr(promoObj) {
  const arr = Object.keys(promoObj).map(ele => {
    return promoObj[ele];
  });
  return arr;
}

promotionRouter.get('/promotions', ensureAuthenticated, async (req, res) => {
  const data = await PromotionsModel.find({});

  const promoObj = data.reduce((acc, cur, index) => {
    acc[index] = cur;
    return acc;
  }, {});

  const cachValue = await client.hget('promotions', 'promotionsField');
  if (cachValue) {
    console.log('read promotions from cache');
    return res.send(object2Arr(JSON.parse(cachValue)));
  }

  client.hset(
    'promotions',
    'promotionsField',
    JSON.stringify(promoObj),
    'EX',
    10
  );

  return res.send(JSON.stringify(object2Arr(promoObj)));
});

promotionRouter.post('/promotions', async (req, res) => {
  const { name, start_date, end_date, items, apply_now } = req.body;
  res.send(JSON.stringify(promotion));
});

promotionRouter.put('/promotions/:id', async (req, res) => {
  const { name, start_date, end_date, items } = req.body;
  res.send(JSON.stringify(promotion));
});

promotionRouter.delete('/promotions/:id', async (req, res) => {
  res.send(JSON.stringify(promotion));
});

export default promotionRouter;
