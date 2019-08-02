function getPromotionAPIHelper({ data }) {
  const promotion = {
    queue: {},
    onLive: '',
    active: '',
    order: []
  };
  const priceSet = {
    items: {},
    active: ''
  };
  data.data.forEach((ele, index) => {
    const strIndex = index.toString();
    Object.defineProperty(promotion.queue, strIndex, {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(priceSet.items, strIndex, {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true
    });

    if (ele.on_live !== strIndex) {
      promotion.order.push(strIndex);
    } else {
      promotion.onLive = ele.on_live;
    }

    promotion.queue[strIndex].promotionId = strIndex;
    promotion.queue[strIndex].startDate = ele.start_date;
    promotion.queue[strIndex].endDate = ele.end_date;
    promotion.queue[strIndex].name = ele.name;
    promotion.queue[strIndex]._id = ele._id;

    priceSet.items[strIndex] = ele.items;
  });
  return { promotion, priceSet };
}
function updatePromotionAPIHelper({ data, queue, items, stashPromotionId }) {
  const _id = data.data._id;
  const updatedQueue = {
    ...queue,
    [stashPromotionId]: {
      ...queue[stashPromotionId],
      _id
    }
  };

  const updatedItems = {
    ...items,
    [stashPromotionId]: [
      ...items[stashPromotionId].map(prdObj => {
        const newPrdObj = prdObj;
        newPrdObj._id = _id;
        return newPrdObj;
      })
    ]
  };
  return { updatedQueue, updatedItems };
}

export { getPromotionAPIHelper, updatePromotionAPIHelper };
