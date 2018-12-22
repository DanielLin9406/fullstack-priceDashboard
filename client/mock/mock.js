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
            "sku":"L1101",
            "name":"BIAS AMP Elite",
            "salePrice":"$99",
            "price":"$199"             
          }
        ],        
        "2":[
          {
            "promotionId":"2",
            "sku":"L1102",
            "name":"BIAS AMP 2 Pro",
            "salePrice":"$99",
            "price":"$199"
          },
          {
            "promotionId":"2",
            "sku":"L1101",
            "name":"BIAS AMP 2 Elite",
            "salePrice":"$99",
            "price":"$199"   
          }     
        ],
        "3":[
          {
            "promotionId":"3",
            "sku":"L1103",
            "name":"BIAS AMP 2 Std",
            "salePrice":"$99",
            "price":"$199" 
          }
        ]
      }
    } 
  };
  data.priceList = {
    "status": true,
    "data": [
      {
        "sku": "L1101",
        "name": "Name of L1101",
        "salePrice": 149,
        "price": 299
      },
      {
        "sku": "L1102",
        "name": "Name of L1102",
        "salePrice": 99,
        "price": 199
      },
      {
        "sku": "L1103",
        "name": "Name of L1103",
        "salePrice": 49,
        "price": 99
      }
    ]
  }
  return data;
}
