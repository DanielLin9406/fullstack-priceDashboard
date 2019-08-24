function loadPayloadAPIHelper({ data }) {
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
  let promotionList = '';
  if (Object.prototype.toString.call(data) === '[object Object]') {
    // const res = await axios
    // data.data = []
    // data.dBstatus = true
    promotionList = data.data;
  } else {
    // const res = await axios
    // data = []
    promotionList = data;
  }
  promotionList.forEach((ele, index) => {
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
    if (ele.on_live === 'onLive') {
      promotion.onLive = strIndex;
    }

    promotion.order.push({
      promoId: strIndex,
      onLive: ele.on_live
    });

    promotion.queue[strIndex].promotionId = strIndex;
    promotion.queue[strIndex].startDate = ele.start_date;
    promotion.queue[strIndex].endDate = ele.end_date;
    promotion.queue[strIndex].name = ele.name;
    promotion.queue[strIndex]._id = ele._id;

    priceSet.items[strIndex] = ele.items;
  });
  return { promotion, priceSet };
}

function sendPayloadAPIHelper({ queue, items, currentPromotionId, param }) {
  return {
    name: queue[currentPromotionId].name,
    start_date: queue[currentPromotionId].startDate,
    end_date: queue[currentPromotionId].endDate,
    items: items[currentPromotionId],
    on_live: param
  };
}

export { loadPayloadAPIHelper, sendPayloadAPIHelper };
