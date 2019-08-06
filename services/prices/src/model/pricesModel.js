import mongoose from '../libs/mongoose/mongoose';

const pricesSchema = new mongoose.Schema({
  sku: String,
  name: String,
  sale_price: Number,
  price: Number
});

export default mongoose.model('Prices', pricesSchema, 'Prices');
