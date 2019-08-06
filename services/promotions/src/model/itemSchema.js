import mongoose from '../libs/mongoose/mongoose';

const itemSchema = new mongoose.Schema({
  sku: String,
  sale_price: Number,
  price: Number,
  name: String
});

export default itemSchema;
