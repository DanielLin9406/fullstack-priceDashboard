module.exports = function () {
  var data = {}
  data.promo6 = {
    "promotion":{
      "onLive":"1",
      "active":"2",
      "order":[
        "2", "3"
      ],    
      "queue":{
        "1":{
          "promotionId":"1",
          "name":"Black Friday Promotion",
          "startDate":"2018/12/03",
          "endDate":"2018/12/06"
        },        
        "2":{
          "promotionId":"2",
          "name":"Holiday Season Promotion",
          "startDate":"2018/12/06",
          "endDate":"2018/12/15"
        },
        "3":{
          "promotionId":"3",
          "name":"Chrimas Promotion",
          "startDate":"2018/12/15",
          "endDate":"2018/12/22"
        }                      
      }
    },
    "priceSet":{
      "active":"2",
      "items":{
        "1":[
          {
            "promotionId":"1",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199"             
          }
        ],        
        "2":[
          {
            "promotionId":"2",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199"
          },
          {
            "promotionId":"2",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199"   
          }     
        ],
        "3":[
          {
            "promotionId":"3",
            "sku":"L2001",
            "name":"BIAS FX Std",
            "price":"$99",
            "retailPrice":"$199" 
          }
        ]
      }
    } 
  };
  return data;
}
