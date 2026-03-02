import createRouter from '../../../shared/libs/router/router';
import ensureAuthenticated from '../middleware/auth/authorization';
import PriceService from '../repo/PriceService';
import logger from '../utils/logger';

const priceRouter = createRouter();

/**
 * Converts an object of objects into an array of objects.
 * 
 * @template T
 * @param {Object.<string, T>} promoObj - The object to convert.
 * @returns {T[]} The array of values.
 */
function object2Arr(promoObj) {
  const arr = Object.keys(promoObj).map(ele => {
    return promoObj[ele];
  });
  return arr;
}

/**
 * GET /prices
 * Retrieves all prices.
 * 
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @returns {Promise<import('express').Response>} The response containing the prices array.
 */
priceRouter.get('/prices', ensureAuthenticated, async (req, res) => {
  try {
    const priceObj = await PriceService.getAllPrices();
    return res.send(object2Arr(priceObj));
  } catch (error) {
    logger.error('Failed to get prices', { error });
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

export default priceRouter;
