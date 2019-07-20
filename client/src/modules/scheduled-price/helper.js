function getPromotionAPIHelper({ json }) {
  let promotion = {
    queue: {},
    onLive: '',
    active: '',
    order: []
  };
  let priceSet = {
    items: {},
    active: ''
  };
  json.data.forEach((ele, index) => {
    const strIndex = index.toString();
    Object.defineProperty(promotion['queue'], strIndex, {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true
    });
    Object.defineProperty(priceSet['items'], strIndex, {
      value: {},
      writable: true,
      configurable: true,
      enumerable: true
    });

    if (ele.on_live !== strIndex) {
      promotion['order'].push(strIndex);
    } else {
      promotion['onLive'] = ele.on_live;
    }

    promotion['queue'][strIndex]['promotionId'] = strIndex;
    promotion['queue'][strIndex]['startDate'] = ele.start_date;
    promotion['queue'][strIndex]['endDate'] = ele.end_date;
    promotion['queue'][strIndex]['name'] = ele.name;
    promotion['queue'][strIndex]['_id'] = ele._id;

    priceSet['items'][strIndex] = ele.items;
  });
  return { promotion, priceSet };
}
function updatePromotionAPIHelper({ json, queue, items, stashPromotionId }) {
  const _id = json.data._id;
  const updated_queue = {
    ...queue,
    [stashPromotionId]: {
      ...queue[stashPromotionId],
      _id
    }
  };

  const updated_items = {
    ...items,
    [stashPromotionId]: [
      ...items[stashPromotionId].map(prdObj => {
        let newPrdObj = prdObj;
        newPrdObj['_id'] = _id;
        return newPrdObj;
      })
    ]
  };
  return { updated_queue, updated_items };
}

export { getPromotionAPIHelper, updatePromotionAPIHelper };
