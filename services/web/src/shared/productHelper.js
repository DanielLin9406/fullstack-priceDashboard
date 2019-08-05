import getKeyArr from '@app/shared/typeHelper';
import { testEmptyObj, testEmptyArray } from '@app/shared/testHelper';

const buildMapSkuToName = (prdArr = []) => {
  const mapObj = {};
  prdArr.forEach(prd => {
    mapObj[prd.sku] = prd.name.replace('BIAS', '');
  });
  return mapObj;
};

const getDefaultPrice = (priceProps, deduct) => {
  const price = priceProps.defaultSalePrice;
  if (typeof price === 'number') {
    return `$${price - deduct}`;
  }
  return `$${parseInt(price.replace(/\$/, '')) - deduct}`;
};

const getUpdatedPrice = (priceProps, deduct) => {
  const updatedPrice = priceProps.salePrice;
  if (typeof updatedPrice === 'number') {
    return `$${updatedPrice - deduct}`;
  }
  return `$${parseInt(updatedPrice.replace(/\$/, '')) - deduct}`;
};

const getStashPromoId = nextProps => {
  const keyArr = nextProps.promotion.order.map(ele => {
    return Number(ele);
  });
  if (keyArr.length === 0) {
    return '0';
  }
  return (Math.max(...(keyArr || 0)) + 1).toString();
};

const getSortedItem = item => {
  const itemType = Object.prototype.toString.call(item);
  if (itemType === '[object Array]' && !testEmptyArray(item)) {
    return item.sort((a, b) => parseInt(a) - parseInt(b));
  }
  if (itemType === '[object Object]' && !testEmptyObj(item)) {
    return getKeyArr(item).sort((a, b) => parseInt(a) - parseInt(b));
  }
  return [];
};

export default buildMapSkuToName;
export { getDefaultPrice, getUpdatedPrice, getStashPromoId, getSortedItem };
