import promotionRouter from '../libs/router/router';
import PromotionsModel from '../model/promotionsModel';
import ensureAuthenticated from '../libs/auth/authorization';
import { object2Arr } from '../libs/util/typeHelper';
import redis from 'redis';
import util from 'util';
import keys from '../config/keys';
import axios from 'axios';
// import promotion from '../db/promotions_db.json';

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});
client.hget = util.promisify(client.hget);

promotionRouter.get('/promotions', ensureAuthenticated, async (req, res) => {
  const cachValue = await client.hget('promotions', 'promotionsField');
  if (cachValue) {
    console.log('read promotions from cache');
    return res.send(object2Arr(JSON.parse(cachValue)));
  }

  const data = await PromotionsModel.find({});
  const promoObj = data.reduce((acc, cur, index) => {
    acc[index] = cur;
    return acc;
  }, {});

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
  // Pull out input data
  const { end_date, items, name, on_live, start_date } = req.body;

  // Get price data from prices services
  const baseURL = keys.pricesPort
    ? `${keys.pricesHost}:${keys.pricesPort}`
    : `${keys.pricesHost}`;
  const pathName = keys.pricesVer ? `/${keys.pricesVer}/prices` : `/prices`;
  const options = {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`
    },
    url: `${baseURL}${pathName}`
  };
  const pricesRes = await axios(options);
  const prices = pricesRes.data;

  // Build Price Cache
  const pricesObj = prices.reduce((acc, cur, index) => {
    acc[cur.sku] = cur;
    return acc;
  }, {});

  // Validate input data, e.g.: Check sku validate
  const validatedItem = items
    .filter(ele => pricesObj[ele.sku].sku === ele.sku)
    .map(ele => ele);

  const payload = {
    name,
    end_date,
    start_date,
    on_live,
    items: validatedItem
  };

  try {
    const cachValue = await client.hget('promotions', 'promotionsField');
    // Create new row in the database
    const promotion = new PromotionsModel({ ...payload });
    const writeDBRes = await promotion.save();
    const cache = JSON.parse(cachValue);
    let newData = [];

    if (cachValue) {
      newData = [...Object.keys(cache).map(ele => cache[ele])];
      newData.push(writeDBRes);
    } else {
      newData = await PromotionsModel.find({});
    }
    const newPromoObj = newData.reduce((acc, cur, index) => {
      acc[index] = cur;
      return acc;
    }, {});
    // Update redis cache data
    client.hset(
      'promotions',
      'promotionsField',
      JSON.stringify(newPromoObj),
      'EX',
      10
    );

    const reSponseData = {
      status: true,
      data: newData
    };
    res.status(201).send(JSON.stringify(reSponseData));
  } catch (error) {
    console.log('err', error);
    res.status(500).send(error);
  }
});

promotionRouter.put('/promotions/:id', async (req, res) => {
  const { name, start_date, end_date, items } = req.body;
  res.send(JSON.stringify(promotion));
});

promotionRouter.delete('/promotions/:id', async (req, res) => {
  res.send(JSON.stringify(promotion));
});

export default promotionRouter;
