import PricesModel from '../schema/pricesModel';
import client from '../db/redis/redis';
import logger from '../utils/logger';

/**
 * Service class for handling Price related operations.
 * Implements Repository pattern with Caching strategy.
 */
class PriceService {

  /**
   * @param {import('redis').RedisClient} client - The Redis client instance.
   * @param {import('winston').Logger} logger - The Winston logger instance.
   */
  constructor(client, logger) {
    this.client = client;
    this.logger = logger;
  }

  /**
   * Fetch all prices, implementing a Cache-Aside strategy.
   * 1. Checks Redis cache.
   * 2. If miss, queries MongoDB.
   * 3. Populates cache with new data.
   * 
   * @returns {Promise<Object.<string, any>>} A promise that resolves to a map of prices.
   * @throws {Error} If database query or cache operation fails.
   */
  async getAllPrices() {
    try {
      // 1. Try to get from Cache
      const cacheKey = 'prices';
      const cacheField = 'pricesField';
      
      const cachedValue = await this.client.hget(cacheKey, cacheField);
      
      if (cachedValue) {
        this.logger.info('Cache Hit: returning prices from Redis');
        return JSON.parse(cachedValue);
      }

      // 2. If Miss, get from DB
      this.logger.info('Cache Miss: fetching prices from DB');
      const data = await PricesModel.find({});
      
      // Convert array to object map (as per original logic)
      const priceObj = data.reduce((acc, cur, index) => {
        acc[index] = cur;
        return acc;
      }, {});

      // 3. Save to Cache
      // Original code used 10 seconds expiration ('EX', 10)
      await this.client.hset(cacheKey, cacheField, JSON.stringify(priceObj), 'EX', 10);
      
      return priceObj;
    } catch (error) {
      this.logger.error('Error in getAllPrices', { error });
      throw error;
    }
  }
}

export default new PriceService(client, logger);
