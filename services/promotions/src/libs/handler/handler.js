// import redis from 'redis';
// import util from 'util';

const createRedisHelper = () => {
  const client = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
  });
  client.hget = util.promisify(client.hget);
  return client;
}

const cacheHelper = (client, promoObj) => {
  const cachValue = await client.hget('promotions', 'promotionsField');
  
  if (cachValue) {
    console.log('read promotions from cache');
    return cachValue
    // return res.send(object2Arr(JSON.parse(cachValue)));
  }

  client.hset(
    'promotions',
    'promotionsField',
    JSON.stringify(promoObj),
    'EX',
    10
  );
}

export default createRedisHelper;
export {
  cacheHelper
}
