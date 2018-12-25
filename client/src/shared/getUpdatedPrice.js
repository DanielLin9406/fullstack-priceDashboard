const getUpdatedPrice = (priceProps, deduct) => {
  let updatedPrice = priceProps.salePrice;
  if (typeof updatedPrice === 'number'){
    return `$${updatedPrice - deduct}`;
  } else {
    return `$${(parseInt(updatedPrice.replace(/\$/, '')) - deduct)}`;
  }
}

export default getUpdatedPrice