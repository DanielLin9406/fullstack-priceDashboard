import mongoose from 'mongoose';
import createEnhancedMongoose from './cache';
import keys from '../../config/keys';

const dBUrl = keys.dbURL;
const opts = { useNewUrlParser: true };

const enhancedMongoose = createEnhancedMongoose(mongoose);

const connectDb = () => {
  return enhancedMongoose.connect(dBUrl, opts);
};

export { connectDb };
export default enhancedMongoose;
