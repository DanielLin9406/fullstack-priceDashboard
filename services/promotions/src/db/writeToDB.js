import json from './promotions_db.json';
import PromotionsModel from '../model/promotionsModel';

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
