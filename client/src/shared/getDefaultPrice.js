const getDefaultPrice = (priceProps, deduct) => {
  const price = priceProps.defaultSalePrice;
  if (typeof price === 'number') {
    return `$${price - deduct}`;
  }
  return `$${parseInt(price.replace(/\$/, '')) - deduct}`;
};

export default getDefaultPrice;
