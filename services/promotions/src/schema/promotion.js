import mongoose from '../db/mongo/mongoose';
import ItemSchema from './item';

/**
 * Mongoose schema for a promotion.
 * 
 * @typedef {Object} Promotion
 * @property {string} name - The name of the promotion.
 * @property {string} start_date - The start date of the promotion (ISO string).
 * @property {string} end_date - The end date of the promotion (ISO string).
 * @property {string} on_live - The status of the promotion (e.g., 'onLive', 'queue').
 * @property {Array<import('./item').Item>} items - The list of items included in the promotion.
 */
const promotionsSchema = new mongoose.Schema({
  name: String,
  start_date: String,
  end_date: String,
  on_live: String,
  items: [ItemSchema]
});

/**
 * Mongoose model for Promotions.
 * @type {import('mongoose').Model<Promotion & import('mongoose').Document>}
 */
export default mongoose.model('Promotions', promotionsSchema, 'Promotions');
