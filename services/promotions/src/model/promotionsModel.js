import mongoose from '../libs/mongoose/mongoose';
import ItemSchema from './itemSchema';

const promotionsSchema = new mongoose.Schema({
  name: String,
  start_date: String,
  end_date: String,
  on_live: String,
  items: [ItemSchema]
});

export default mongoose.model('Promotions', promotionsSchema, 'Promotions');
