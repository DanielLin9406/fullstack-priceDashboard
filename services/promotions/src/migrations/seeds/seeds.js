import json from './promotions_db.js';
import PromotionsModel from '../../schema/promotion.js';

/**
 * Seeds the database with initial promotion data from the JSON file.
 * Checks if a promotion with the same name exists before saving.
 * 
 * @returns {void}
 */
const saveData = () => {
  json.forEach(async (ele, index, arr) => {
    const res = await PromotionsModel.findOne({ name: ele.name });
    if (res === null) {
      const row = new PromotionsModel({ ...ele });
      await row.save();
      if (index === arr.length - 1) {
        console.log('save promotions data done');
      }
    }
  });
};

export default json;
export { saveData };
