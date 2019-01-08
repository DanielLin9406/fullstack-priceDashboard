
function promotionAPIHelper (json) {
  let promotion = {
    queue:{},
    onLive:"",
    active:"",  
    order:[]  
  };
  let priceSet = {
    items:{},
    active:"",
  };
  json.data.forEach((ele, index) => {
    const strIndex = (index).toString();
    Object.defineProperty(promotion["queue"], strIndex, {
      value: {},
      writable: true,
      enumerable: true
    })
    Object.defineProperty(priceSet["items"], strIndex, {
      value: {},
      writable: true,
      enumerable: true
    })        

    if (ele.on_live !== strIndex){
      promotion["order"].push(strIndex);
    } else {
      promotion["onLive"] = ele.on_live;
    }

    promotion["queue"][strIndex]["promotionId"] = strIndex;
    promotion["queue"][strIndex]["startDate"] = ele.end_date;
    promotion["queue"][strIndex]["endDate"] = ele.end_date;
    promotion["queue"][strIndex]["name"] = ele.name;
    
    priceSet["items"][strIndex] = ele.items
  })
  return { promotion, priceSet }
}
export {promotionAPIHelper}