const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Price = new Schema({
  sku: String,
  name: String,
  sale_price: Number,
  price: Number
});

mongoose.model('Price', Price);
mongoose.connect('mongodb://localhost/price')

