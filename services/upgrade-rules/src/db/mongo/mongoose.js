import mongoose from 'mongoose';
import keys from '../../config/keys';
import logger from '../../middleware/logger';

const dBUrl = keys.dbURL;
const opts = { useNewUrlParser: true };

const connectDb = () => {
  return mongoose.connect(dBUrl, opts)
    .then(() => {
      logger.info('Successfully connected to MongoDB');
    })
    .catch((err) => {
      logger.error('MongoDB connection error', { error: err });
      process.exit(1);
    });
};

export { connectDb };
export default mongoose;
