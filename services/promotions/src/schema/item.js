import mongoose from '../db/mongo/mongoose';

/**
 * Mongoose schema for an item within a promotion.
 * 
 * @typedef {Object} Item
 * @property {string} sku - The Stock Keeping Unit identifier.
 * @property {number} sale_price - The discounted price of the item.
 * @property {number} price - The original price of the item.
 * @property {string} name - The name of the item.
 */
const itemSchema = new mongoose.Schema({
  sku: String,
  sale_price: Number,
  price: Number,
  name: String
});

export default itemSchema;
