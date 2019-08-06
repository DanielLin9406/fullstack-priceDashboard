import redis from 'redis';
import util from 'util';
import keys from '../../config/keys';

const client = redis.createClient(keys.redisURL);
client.hget = util.promisify(client.hget);

const createEnhancedMongoose = mongoose => {
  const exec = mongoose.Query.prototype.exec;
  mongoose.Query.prototype.cache = function(options = {}) {
    this.useCache = true;
    this.hashKey = JSON.stringify(options.key || '');

    return this; // Chainable
  };

  mongoose.Query.prototype.exec = async function() {
    if (!this.useCache) {
      return exec.apply(this, arguments);
    }
    const key = JSON.stringify(
      Object.assign({}, this.getQuery(), {
        // this refer to a each Query instance
        collection: this.mongooseCollection.name
      })
    );

    const cachValue = await client.hget(this.hashKey, key);

    if (cachValue) {
      const doc = JSON.parse(cachValue);

      return Array.isArray(doc)
        ? doc.map(ele => new this.model(ele))
        : new this.model(doc);
    }

    // 輸出原本的exec function
    // Query will run expectly
    const result = await exec.apply(this, arguments);
    client.hset(this.hashKey, key, JSON.stringify(result), 'EX', 10);

    return result;
  };

  return mongoose;
};

const clearHash = hashKey => {
  client.del(JSON.stringify(hashKey));
};

export default createEnhancedMongoose;
export { clearHash };
