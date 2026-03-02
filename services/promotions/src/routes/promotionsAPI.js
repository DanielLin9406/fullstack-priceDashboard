import createRouter from '../../../shared/libs/router/router';
import PromotionsModel from '../schema/promotion';
import ensureAuthenticated from '../middleware/auth/authorization';
import { object2Arr } from '../../../shared/libs/util/typeHelper';
import validateRequest from '../../../shared/libs/middleware/validateRequest';
import { createPromotionSchema, updatePromotionSchema } from '../dto/promotion.zod';

import keys from '../config/keys';
import axios from 'axios';
import client from '../db/redis/redis';
// import promotion from '../db/promotions_db.json';

const promotionRouter = createRouter();

/**
 * GET /promotions
 * Retrieves all promotions, checking cache first.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} List of promotions.
 */
promotionRouter.get('/promotions', ensureAuthenticated, async (req, res) => {
  const cachValue = await client.hget('promotions', 'promotionsField');
  if (cachValue) {
    console.log('read promotions from cache');
    return res.send(object2Arr(JSON.parse(cachValue)));
  }

  const data = await PromotionsModel.find({});
  const promoObj = data.reduce((acc, cur, index) => {
    acc[cur._id] = cur;
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

/**
 * POST /promotions
 * Creates a new promotion.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} The created promotion or updated list.
 */
promotionRouter.post('/promotions', validateRequest(createPromotionSchema), async (req, res) => {
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
    if (on_live === 'onLive') {
      const updateDBRes = await PromotionsModel.findOneAndUpdate(
        { on_live: 'onLive' },
        { on_live: 'queue' },
        { new: true }
      );
      const promotion = new PromotionsModel({
        ...payload,
        items: validatedItem
      });
      const writeDBRes = await promotion.save();
      const cachValue = await client.hget('promotions', 'promotionsField');
      let newData = [];

      if (cachValue) {
        const cache = JSON.parse(cachValue);
        // update which is onlive to queue
        if (updateDBRes) {
          newData = [
            ...Object.keys(cache).map(ele => {
              if (ele === updateDBRes._id.toString()) {
                return updateDBRes;
              } else {
                return cache[ele];
              }
            })
          ];
        } else {
          newData = [...Object.keys(cache).map(ele => cache[ele])];
        }
        // add new onlive
        newData.push(writeDBRes);
      } else {
        newData = await PromotionsModel.find({});
      }
      const newPromoObj = newData.reduce((acc, cur, index) => {
        acc[cur._id] = cur;
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
        dBStatus: true,
        data: newData
      };

      res.status(201).send(JSON.stringify(reSponseData));
    } else {
      // Create new row in the database
      const promotion = new PromotionsModel({
        ...payload,
        items: validatedItem
      });
      const writeDBRes = await promotion.save();
      const cachValue = await client.hget('promotions', 'promotionsField');
      let newData = [];

      if (cachValue) {
        const cache = JSON.parse(cachValue);
        newData = [...Object.keys(cache).map(ele => cache[ele])];
        newData.push(writeDBRes);
      } else {
        newData = await PromotionsModel.find({});
      }
      const newPromoObj = newData.reduce((acc, cur, index) => {
        acc[cur._id] = cur;
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
        dBStatus: true,
        data: newData
      };
      res.status(201).send(JSON.stringify(reSponseData));
    }
  } catch (error) {
    console.log('err', error);
    res.status(500).send(error);
  }
});

/**
 * PUT /promotions/:id
 * Updates an existing promotion by ID.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} The updated list of promotions.
 */
promotionRouter.put('/promotions/:id', validateRequest(updatePromotionSchema), async (req, res) => {
  const { name, start_date, end_date, items } = req.body;
  const _id = req.params.id;
  const payload = {
    name,
    end_date,
    start_date,
    items
  };

  try {
    const cachValue = await client.hget('promotions', 'promotionsField');
    const updateDBRes = await PromotionsModel.findByIdAndUpdate(
      { _id },
      { ...payload },
      { new: true },
      (error, document) => document
    );

    let newData = [];
    if (cachValue) {
      const cache = JSON.parse(cachValue);
      newData = [
        ...Object.keys(cache).map(ele => {
          if (ele === _id) {
            return updateDBRes;
          } else {
            return cache[ele];
          }
        })
      ];
    } else {
      newData = await PromotionsModel.find({});
    }

    const newPromoObj = newData.reduce((acc, cur, index) => {
      acc[cur._id] = cur;
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
      dBStatus: true,
      data: newData
    };
    res.status(200).send(JSON.stringify(reSponseData));
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * DELETE /promotions/:id
 * Deletes a promotion by ID.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} The updated list of promotions.
 */
promotionRouter.delete('/promotions/:id', async (req, res) => {
  const _id = req.params.id;
  try {
    const cachValue = await client.hget('promotions', 'promotionsField');
    await PromotionsModel.findOneAndDelete({ _id });
    let newData = [];
    if (cachValue) {
      const cache = JSON.parse(cachValue);
      newData = [
        ...Object.keys(cache)
          .filter(ele => ele !== _id)
          .map(ele => cache[ele])
      ];
    } else {
      newData = await PromotionsModel.find({});
    }

    const newPromoObj = newData.reduce((acc, cur, index) => {
      acc[cur._id] = cur;
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
      dBStatus: true,
      data: newData
    };
    res.status(200).send(JSON.stringify(reSponseData));
  } catch (error) {
    res.status(500).send(error);
  }
});

export default promotionRouter;
