import redis from 'redis';
import util from 'util';
import keys from '../../config/keys';
import logger from '../logger';

const client = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

client.on('error', (err) => {
  logger.error('Redis Client Error', { error: err });
});

client.hget = util.promisify(client.hget);
client.hset = util.promisify(client.hset);
client.del = util.promisify(client.del);

export default client;
