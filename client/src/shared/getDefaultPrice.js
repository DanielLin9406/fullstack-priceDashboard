const getDefaultPrice = (priceProps, deduct) => {
  let price = priceProps.defaultSalePrice;
  if (typeof price === 'number'){
    return `$${price - deduct}`;
  } else {
    return `$${(parseInt(price.replace(/\$/, '')) - deduct)}`;
  }
}

export default getDefaultPrice