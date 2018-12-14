module.exports = function () {
  var data = {}
  data.promo = {
    "promotion":{
      "active":"1",
      "order":[
        "0","1"
      ],    
      "queue":{
        "0":{
          "promotionId":"001",
          "name":"Black Friday Promotion",
          "startDate":"2016/12/06",
          "endDate":"2016/12/15"
        },
        "1":{
          "promotionId":"002",
          "name":"Black Friday Promotion",
          "startDate":"2016/12/06",
          "endDate":"2016/12/15"
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
