const testBundle = sku => {
  const reg = /^B/;
  if (reg.test(sku)) {
    return true;
  }
  return false;
};

const testEmptyObj = obj => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

const testEmptyArray = arr => {
  return arr.length === 0;
};

const testProductInItem = ({ sku, currentItems }) => {
  if (!currentItems) return;
  return currentItems.every(item => {
    if (item.sku === sku) {
      return false;
    }
    return true;
  });
};

const testScheduleComplete = ({ key, queue, items }) => {
  // queue and item has stashPromotionId => starting edit
  if (
    Object.prototype.hasOwnProperty.call(items.key) &&
    items[key].length > 0 &&
    queue[key].startDate !== '' &&
    queue[key].endDate !== '' &&
    queue[key].name !== ''
  ) {
    return true;
  }
  return false;
};

export default testBundle;
export {
  testEmptyObj,
  testEmptyArray,
  testProductInItem,
  testScheduleComplete
};
