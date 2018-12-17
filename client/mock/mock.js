module.exports = function () {
  var data = {}
  data.promo4 = {
    "promotion":{
      "onLive":"001",
      "active":"001",
      "order":[
        "001","002"
      ],    
      "queue":{
        "001":{
          "promotionId":"001",
          "name":"Black Friday Promotion",
          "startDate":"2018/12/06",
          "endDate":"2018/12/15"
        },
        "002":{
          "promotionId":"002",
          "name":"Black Friday Promotion",
          "startDate":"2018/12/15",
          "endDate":"2018/12/22"
        }                      
      }
    },
    "priceSet":{
      "order":["001","002"],
      "active":"001",
      "items":{
        "001":[
          {
            "id":"001",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199"
          },
          {
            "id":"001",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199"   
          }     
        ],
        "002":{
          "id":"002",
          "sku":"L2001",
          "name":"BIAS FX Std",
          "price":"$99",
          "retailPrice":"$199" 
        }
      }
    } 
  };
  return data;
}
