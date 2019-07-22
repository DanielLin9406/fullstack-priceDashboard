const getStashPromoId = nextProps => {
  const keyArr = nextProps.promotion.order.map(ele => {
    return Number(ele);
  });
  if (keyArr.length === 0) {
    return '0';
  }
  return (Math.max(...(keyArr || 0)) + 1).toString();
};

export default getStashPromoId;
