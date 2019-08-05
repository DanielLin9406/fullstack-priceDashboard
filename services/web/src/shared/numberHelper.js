const formatNumber = priceObj => {
  const obj = {};
  Object.keys(priceObj).forEach(ele => {
    if (typeof priceObj[ele] === 'number') {
      obj[ele] = `$${priceObj[ele]}`;
    } else {
      obj[ele] = `${priceObj[ele]}`;
    }
  });
  return obj;
};

export default formatNumber;
