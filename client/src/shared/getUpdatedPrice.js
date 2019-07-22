const getUpdatedPrice = (priceProps, deduct) => {
  const updatedPrice = priceProps.salePrice;
  if (typeof updatedPrice === 'number') {
    return `$${updatedPrice - deduct}`;
  }
  return `$${parseInt(updatedPrice.replace(/\$/, '')) - deduct}`;
};

export default getUpdatedPrice;
