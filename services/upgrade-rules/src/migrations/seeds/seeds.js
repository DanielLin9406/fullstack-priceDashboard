import json from './upgradeRule_db.js';
import UpgradeRuleModel from '../../model/upgradeRuleModel';

const createData = () => {
  return Object.keys(json).map(ele => {
    let obj = {};
    obj = { ...json[ele] };
    obj.name = ele;
    obj.upgrade = Object.keys(obj.upgrade).map(ele2 => {
      let obj2 = {};
      obj2.name = ele2;
      obj2.deduct = obj.upgrade[ele2];
      return obj2;
    });
    return obj;
  });
};

const saveData = () => {
  const dataArr = createData();
  dataArr.forEach(async (ele, index, arr) => {
    const res = await UpgradeRuleModel.findOne({ name: ele.name });
    if (res === null) {
      const row = new UpgradeRuleModel({ ...ele });
      await row.save();
      if (index === arr.length - 1) {
        console.log('save price upgrade rule done');
      }
    }
  });
};

export default createData;
export { saveData };
