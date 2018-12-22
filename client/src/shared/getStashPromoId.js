const getStashPromoId = (nextProps) => {
  const keyArr = nextProps.promotion.order.map((ele) => {
    return Number(ele);
  });
  return (Math.max(...keyArr)+1).toString();  
}

export default getStashPromoId;