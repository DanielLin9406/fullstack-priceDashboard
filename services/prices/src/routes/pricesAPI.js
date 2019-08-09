import priceRouter from '../libs/router/router';
import PricesModel from '../model/pricesModel';
import ensureAuthenticated from '../libs/auth/authorization';
import redis from 'redis';
import util from 'util';
import keys from '../config/keys';

const client = redis.createClient(keys.redisUrl);
client.hget = util.promisify(client.hget);

function object2Arr(promoObj) {
  const arr = Object.keys(promoObj).map(ele => {
    return promoObj[ele];
  });
  return arr;
}

priceRouter.get('/prices', ensureAuthenticated, async (req, res) => {
  const data = await PricesModel.find({});

  const priceObj = data.reduce((acc, cur, index) => {
    acc[index] = cur;
    return acc;
  }, {});

  const cachValue = await client.hget('prices', 'pricesField');
  if (cachValue) {
    console.log('read prices from cache');
    return res.send(object2Arr(JSON.parse(cachValue)));
  }

  client.hset('prices', 'pricesField', JSON.stringify(priceObj), 'EX', 10);

  return res.send(JSON.stringify(object2Arr(priceObj)));
});

export default priceRouter;
