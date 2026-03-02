import json from './prices_db.js';
import PricesModel from '../../schema/pricesModel.js';

/**
 * Seeds the database with initial price data from the JSON file.
 * Checks if a price with the same name exists before saving.
 * 
 * @returns {void}
 */
const saveData = () => {
  json.forEach(async (ele, index, arr) => {
    const res = await PricesModel.findOne({ name: ele.name });
    if (res === null) {
      const row = new PricesModel({ ...ele });
      await row.save();
      if (index === arr.length - 1) {
        console.log('save price data done');
      }
    }
  });
};

export default json;
export { saveData };
