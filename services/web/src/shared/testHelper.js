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
  const result = [];
  // if (!Object.prototype.hasOwnProperty.call(items, key))
  if (items[key].length === 0) {
    result.push({
      name: 'promoItem',
      result: false,
      message: "Don't have items in this promotion"
    });
  }
  if (queue[key].startDate === '') {
    result.push({
      name: 'promoStartDate',
      result: false,
      message: "Don't contain promotion start date"
    });
  }
  if (queue[key].endDate === '') {
    result.push({
      name: 'promoEndDate',
      result: false,
      message: "Don't contain promotion end date"
    });
  }
  if (queue[key].name === '') {
    result.push({
      name: 'promoName',
      result: false,
      message: "Don't contain promotion name"
    });
  }
  return result;
};

export default testBundle;
export {
  testEmptyObj,
  testEmptyArray,
  testProductInItem,
  testScheduleComplete
};
