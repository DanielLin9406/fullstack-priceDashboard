module.exports = function () {
  var data = {}
  
  data.promotions = [
    {
      "name": "Black Friday Promotion",
      "start_date": "2019-07-16",
      "end_date": "2020-08-16",
      "onLive":"0",
      "items": [
        {
          "sku": "L2001",
          "sale_price": 137,
          "price": 1337,
          "name": "BIAS AMP Eltie"
        }
      ],
      "_id": "507f1f77bcf86cd799439011"
    }
  ]    
  data.price = [
    {
      "sku": "L1101",
      "name": "Name of L1101",
      "sale_price": 149,
      "price": 299
    },
    {
      "sku": "L1102",
      "name": "Name of L1102",
      "sale_price": 99,
      "price": 199
    },
    {
      "sku": "L1103",
      "name": "Name of L1103",
      "sale_price": 49,
      "price": 99
    },
    {
      "sku": "L1104",
      "name": "Name of L1104",
      "sale_price": 29,
      "price": 79
    },
    {
      "sku": "L1111",
      "name": "Name of L1111",
      "sale_price": 50,
      "price": 100
    },      
    {
      "sku": "L1112",
      "name": "Name of L1112",
      "sale_price": 349,
      "price": 699
    },     
    {
      "sku": "L2001",
      "name": "Name of L2001",
      "sale_price": 159,
      "price": 199
    },      
    {
      "sku": "L2002",
      "name": "Name of L2002",
      "sale_price": 79,
      "price": 99
    },      
    {
      "sku": "L2003",
      "name": "Name of L2003",
      "sale_price": 59,
      "price": 79
    },      
    {
      "sku": "L2004",
      "name": "Name of L2004",
      "sale_price": 59,
      "price": 79
    },      
    {
      "sku": "L2011",
      "name": "Name of L2011",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2012",
      "name": "Name of L2012",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2013",
      "name": "Name of L2013",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2101",
      "name": "Name of L2101",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2102",
      "name": "Name of L2102",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2103",
      "name": "Name of L2103",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L2104",
      "name": "Name of L2104",
      "sale_price": 29,
      "price": 49
    },      
    {
      "sku": "L3001",
      "name": "Name of L3001",
      "sale_price": 59,
      "price": 79
    },      
    {
      "sku": "L3002",
      "name": "Name of L3002",
      "sale_price": 59,
      "price": 79
    },     
    {
      "sku": "L3003",
      "name": "Name of L3003",
      "sale_price": 59,
      "price": 79
    },      
    {
      "sku": "L4001",
      "name": "Name of L4001",
      "sale_price": 49,
      "price": 99
    },      
    {
      "sku": "L4002",
      "name": "Name of L4002",
      "sale_price": 39,
      "price": 79
    },
    {
      "sku": "B1011",
      "name": "Name of B1011",
      "sale_price": 999,
      "price": 1699
    },
    {
      "sku": "B1012",
      "name": "Name of B1012",
      "sale_price": 899,
      "price": 1599
    },              
    {
      "sku": "B1013",
      "name": "Name of B1013",
      "sale_price": 799,
      "price": 1499
    },              
    {
      "sku": "B2001",
      "name": "Name of B2001",
      "sale_price": 999,
      "price": 1099
    },              
    {
      "sku": "B2002",
      "name": "Name of B2002",
      "sale_price": 999,
      "price": 1099
    },              
    {
      "sku": "B2003",
      "name": "Name of B2003",
      "sale_price": 899,
      "price": 999
    },              
    {
      "sku": "B2004",
      "name": "Name of B2004",
      "sale_price": 799,
      "price": 899
    },              
    {
      "sku": "B2005",
      "name": "Name of B2005",
      "sale_price": 699,
      "price": 799
    },              
    {
      "sku": "B2011",
      "name": "Name of B2011",
      "sale_price": 599,
      "price": 699
    },              
    {
      "sku": "B3001",
      "name": "Name of B3001",
      "sale_price": 499,
      "price": 599
    },              
    {
      "sku": "B3002",
      "name": "Name of B3002",
      "sale_price": 399,
      "price": 499
    },              
    {
      "sku": "B3003",
      "name": "Name of B3003",
      "sale_price": 299,
      "price": 399
    },              
    {
      "sku": "B3004",
      "name": "Name of B3004",
      "sale_price": 199,
      "price": 299
    },              
    {
      "sku": "B3005",
      "name": "Name of B3005",
      "sale_price": 99,
      "price": 199
    }          
  ]
  data["upgrade-rules"] = {
    "license": [],
    "rule": {
      "B1011": {
        "bundle": [
          "L2001",
          "L3001",
          "L2011",
          "L2012",
          "L2013",
          "L3002",
          "L3003",
          "L4001",
          "L4002",
          "L1101"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx",
          "pedal",
          "mastering",
          "masteringeq",
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1101": 61,
          "L2001": 61,
          "L2011": 24,
          "L2012": 24,
          "L2013": 24,
          "L3001": 30,
          "L3002": 30,
          "L3003": 30,
          "L4001": 30,
          "L4002": 30
        }
      },
      "B1012": {
        "bundle": [
          "L2001",
          "L3001",
          "L2011",
          "L2012",
          "L2013",
          "L3002",
          "L3003",
          "L1102"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx",
          "pedal",
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1102": 58,
          "L2001": 58,
          "L2011": 23,
          "L2012": 23,
          "L2013": 23,
          "L3001": 29,
          "L3002": 29,
          "L3003": 29
        }
      },
      "B1013": {
        "bundle": [
          "L2001",
          "L2011",
          "L2012",
          "L2013",
          "L1102"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx",
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1102": 62,
          "L2001": 62,
          "L2011": 24,
          "L2012": 24,
          "L2013": 24
        }
      },
      "B2001": {
        "bundle": [
          "L1001",
          "L2001"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "bias",
          "biasfx"
        ],
        "successor": [],
        "upgrade": {
          "L1002": 110,
          "L2002": 110
        }
      },
      "B2002": {
        "bundle": [
          "L3001",
          "L3002",
          "L3003"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "pedal"
        ],
        "successor": [],
        "upgrade": {
          "L3001": 75,
          "L3002": 75,
          "L3003": 75
        }
      },
      "B2003": {
        "bundle": [
          "L2011",
          "L2012",
          "L2013"
        ],
        "predecessor": [],
        "prerequisite": [
          "L2002",
          "L2001",
          "L2003"
        ],
        "prerequisite_logic": "or",
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {
          "L2011": 36,
          "L2012": 36,
          "L2013": 36
        }
      },
      "B2004": {
        "bundle": [
          "L2002",
          "L1103"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx",
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1103": 74,
          "L2002": 74
        }
      },
      "B2005": {
        "bundle": [
          "L2001",
          "L2011",
          "L2012",
          "L2013"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {
          "L2001": 159,
          "L2011": 63,
          "L2012": 63,
          "L2013": 63
        }
      },
      "B2011": {
        "bundle": [
          "L2001",
          "L1102"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx",
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1102": 149,
          "L2001": 149
        }
      },
      "B3001": {
        "bundle": [
          "C1011",
          "C1012",
          "C1013",
          "C1014",
          "C1015"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "B3002": {
        "bundle": [
          "C1016",
          "C1017",
          "C1018",
          "C1019",
          "C1020"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "B3003": {
        "bundle": [
          "C1021",
          "C1022",
          "C1023",
          "C1024",
          "C1025"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "B3004": {
        "bundle": [
          "C1006",
          "C1007",
          "C1008",
          "C1009",
          "C1010"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "B3005": {
        "bundle": [
          "C1001",
          "C1002",
          "C1003",
          "C1004",
          "C1005"
        ],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1001": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1002": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1003": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1004": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1005": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1006": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1007": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1008": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1009": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1010": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1011": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1012": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1013": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1014": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1015": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1016": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1017": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1018": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1019": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1020": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1021": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1022": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1023": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1024": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "C1025": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "celestionir"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L1001": {
        "bundle": [],
        "predecessor": [
          "L1004",
          "L1003",
          "L1002"
        ],
        "prerequisite": [],
        "software": [
          "bias"
        ],
        "successor": [],
        "upgrade": {
          "L1002": 59
        }
      },
      "L1002": {
        "bundle": [],
        "predecessor": [
          "L1004",
          "L1003"
        ],
        "prerequisite": [],
        "software": [
          "bias"
        ],
        "successor": [
          "L1001"
        ],
        "upgrade": {}
      },
      "L1003": {
        "bundle": [],
        "predecessor": [
          "L1004"
        ],
        "prerequisite": [],
        "software": [
          "bias"
        ],
        "successor": [
          "L1002",
          "L1001"
        ],
        "upgrade": {}
      },
      "L1004": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "bias"
        ],
        "successor": [
          "L1003",
          "L1002",
          "L1001"
        ],
        "upgrade": {}
      },
      "L1101": {
        "bundle": [],
        "predecessor": [
          "L1104",
          "L1103",
          "L1102"
        ],
        "prerequisite": [],
        "software": [
          "amp2"
        ],
        "successor": [],
        "upgrade": {
          "L1001": 0,
          "L1002": -100,
          "L1102": 99,
          "L1103": 49,
          "L1104": 0,
          "L2001": -130,
          "L2002": -130,
          "L3001": -130,
          "L3002": -130,
          "L3003": -130
        }
      },
      "L1102": {
        "bundle": [],
        "predecessor": [
          "L1104",
          "L1103"
        ],
        "prerequisite": [],
        "software": [
          "amp2"
        ],
        "successor": [
          "L1101"
        ],
        "upgrade": {
          "L1001": 0,
          "L1002": -50,
          "L1103": 49,
          "L1104": 0,
          "L2001": -80,
          "L2002": -80,
          "L3001": -80,
          "L3002": -80,
          "L3003": -80
        }
      },
      "L1103": {
        "bundle": [],
        "predecessor": [
          "L1104"
        ],
        "prerequisite": [],
        "software": [
          "amp2"
        ],
        "successor": [
          "L1102",
          "L1101"
        ],
        "upgrade": {
          "L1002": 0,
          "L1104": 0,
          "L2001": -30,
          "L2002": -30,
          "L3001": -30,
          "L3002": -30,
          "L3003": -30
        }
      },
      "L1104": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "amp2"
        ],
        "successor": [
          "L1103",
          "L1102",
          "L1101"
        ],
        "upgrade": {}
      },
      "L1111": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [
          "L2001",
          "L2002",
          "L1103",
          "L1102",
          "L1101"
        ],
        "prerequisite_logic": "or",
        "software": [
          "celestion-modern-vintage"
        ],
        "successor": [],
        "upgrade": {
          "L1101": 0,
          "L1102": 0,
          "L1103": 0,
          "L2001": -30,
          "L2002": -40
        }
      },
      "L1112": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "prerequisite_logic": "or",
        "software": [
          "fx2-celestion-ir-preorder"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L2001": {
        "bundle": [],
        "predecessor": [
          "L2004",
          "L2003",
          "L2002"
        ],
        "prerequisite": [],
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {
          "L2002": 49,
          "L2003": 20
        }
      },
      "L2002": {
        "bundle": [],
        "predecessor": [
          "L2004",
          "L2003"
        ],
        "prerequisite": [],
        "software": [
          "biasfx"
        ],
        "successor": [
          "L2001"
        ],
        "upgrade": {
          "L2003": 20
        }
      },
      "L2003": {
        "bundle": [],
        "predecessor": [
          "L2004"
        ],
        "prerequisite": [],
        "software": [
          "biasfx"
        ],
        "successor": [
          "L2002",
          "L2001"
        ],
        "upgrade": {}
      },
      "L2004": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "biasfx"
        ],
        "successor": [
          "L2003",
          "L2002",
          "L2001"
        ],
        "upgrade": {}
      },
      "L2011": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [
          "L2001",
          "L2002"
        ],
        "prerequisite_logic": "or",
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L2012": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [
          "L2001",
          "L2002"
        ],
        "prerequisite_logic": "or",
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L2013": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [
          "L2001",
          "L2002"
        ],
        "prerequisite_logic": "or",
        "software": [
          "biasfx"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L2101": {
        "bundle": [],
        "predecessor": [
          "L2104",
          "L2103",
          "L2102"
        ],
        "prerequisite": [],
        "software": [
          "fx2"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L2102": {
        "bundle": [],
        "predecessor": [
          "L2104",
          "L2103"
        ],
        "prerequisite": [],
        "software": [
          "fx2"
        ],
        "successor": [
          "L2101"
        ],
        "upgrade": {}
      },
      "L2103": {
        "bundle": [],
        "predecessor": [
          "L2104"
        ],
        "prerequisite": [],
        "software": [
          "fx2"
        ],
        "successor": [
          "L2102",
          "L2101"
        ],
        "upgrade": {}
      },
      "L2104": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "fx2"
        ],
        "successor": [
          "L2103",
          "L2102",
          "L2101"
        ],
        "upgrade": {}
      },
      "L3001": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "pedal"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L3002": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "pedal"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L3003": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "pedal"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L4001": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "mastering"
        ],
        "successor": [],
        "upgrade": {}
      },
      "L4002": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "masteringeq"
        ],
        "successor": [],
        "upgrade": {}
      },
      "M0001": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "com.positivegrid.biasfx.EssentialLicense"
        ],
        "successor": [],
        "upgrade": {}
      },
      "M0002": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "com.positivegrid.biasfx.LIVE.EffectPowerhouse"
        ],
        "successor": [],
        "upgrade": {}
      },
      "M0003": {
        "bundle": [],
        "predecessor": [],
        "prerequisite": [],
        "software": [
          "com.positivegrid.biasfx.LIVE.FuzzFactory"
        ],
        "successor": [],
        "upgrade": {}
      }
    }
  }
  return data;
}

// "data":{"license":[],"rule":{"B3003":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["C1021","C1022","C1023","C1024","C1025"],"software":["celestionir"],"upgrade":{}},"B3001":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["C1011","C1012","C1013","C1014","C1015"],"software":["celestionir"],"upgrade":{}},"B3002":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["C1016","C1017","C1018","C1019","C1020"],"software":["celestionir"],"upgrade":{}},"B2003":{"prerequisite":["L2002","L2001","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":["L2011","L2012","L2013"],"software":["biasfx"],"upgrade":{"L2011":72,"L2012":72,"L2013":72},"prerequisite_logic":"or"},"B3005":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["C1001","C1002","C1003","C1004","C1005"],"software":["celestionir"],"upgrade":{}},"B3004":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["C1006","C1007","C1008","C1009","C1010"],"software":["celestionir"],"upgrade":{}},"B2002":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L3001","L3002","L3003"],"software":["pedal"],"upgrade":{"L3001":75,"L3002":75,"L3003":75}},"B1021":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L3001","L2011","L2012","L2013","L3002","L3003","L4001","L4002","L1101","L2101"],"software":["pedal","biasfx","mastering","masteringeq","amp2","fx2"],"upgrade":{"L3001":56,"L2011":44,"L2012":44,"L2013":44,"L3002":56,"L3003":56,"L4001":56,"L4002":56,"L1101":169,"L2101":169}},"B1022":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L3001","L2011","L2012","L2013","L3002","L3003","L1102","L2102"],"software":["pedal","biasfx","amp2","fx2"],"upgrade":{"L3001":58,"L2011":46,"L2012":46,"L2013":46,"L3002":58,"L3003":58,"L1102":117,"L2102":117}},"B1023":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L2011","L2012","L2013","L1102","L2102"],"software":["biasfx","amp2","fx2"],"upgrade":{"L2011":49,"L2012":49,"L2013":49,"L1102":125,"L2102":125}},"B2021":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L1102","L2102"],"software":["amp2","fx2"],"upgrade":{"L1102":149,"L2102":149}},"B2014":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L1103","L2103"],"software":["amp2","fx2"],"upgrade":{"L1103":74,"L2103":74}},"B2015":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L2011","L2012","L2013","L2102"],"software":["biasfx","fx2"],"upgrade":{"L2011":63,"L2012":63,"L2013":63,"L2102":159}},"B2016":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":["L3001","L3002","L3003","L1101","L2101","L1114"],"software":["pedal","amp2","fx2","celestion-classic"],"upgrade":{"L1101":199,"L2101":199}},"L1111":{"prerequisite":["L2001","L2002","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":[],"software":["celestion-modern-vintage"],"upgrade":{"L1103":50,"L1101":50,"L2001":20,"L2002":10,"L1102":50},"prerequisite_logic":"or"},"C1003":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L2011":{"prerequisite":["L2001","L2002","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":[],"software":["biasfx"],"upgrade":{},"prerequisite_logic":"or"},"L1003":{"prerequisite":[],"predecessor":["L1004"],"successor":["L1002","L1001"],"bundle":[],"software":["bias"],"upgrade":{}},"L3001":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["pedal"],"upgrade":{}},"L1103":{"prerequisite":[],"predecessor":["L1104"],"successor":["L1102","L1101"],"bundle":[],"software":["amp2"],"upgrade":{"L1002":50,"L1104":50}},"C1004":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1006":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1012":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1014":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1020":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L1001":{"prerequisite":[],"predecessor":["L1004","L1003","L1002"],"successor":[],"bundle":[],"software":["bias"],"upgrade":{"L1002":99}},"L3002":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["pedal"],"upgrade":{}},"C1021":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L2012":{"prerequisite":["L2001","L2002","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":[],"software":["biasfx"],"upgrade":{},"prerequisite_logic":"or"},"C1007":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L2003":{"prerequisite":[],"predecessor":["L2004"],"successor":["L2002","L2001"],"bundle":[],"software":["biasfx"],"upgrade":{}},"L4002":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["masteringeq"],"upgrade":{}},"C1024":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1010":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1011":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1023":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L1002":{"prerequisite":[],"predecessor":["L1004","L1003"],"successor":["L1001"],"bundle":[],"software":["bias"],"upgrade":{}},"L3003":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["pedal"],"upgrade":{}},"C1005":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1008":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1019":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1018":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L2013":{"prerequisite":["L2001","L2002","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":[],"software":["biasfx"],"upgrade":{},"prerequisite_logic":"or"},"L1104":{"prerequisite":[],"predecessor":[],"successor":["L1103","L1102","L1101"],"bundle":[],"software":["amp2"],"upgrade":{}},"L1101":{"prerequisite":[],"predecessor":["L1104","L1103","L1102"],"successor":[],"bundle":[],"software":["amp2"],"upgrade":{"L1103":99,"L1001":150,"L1002":50,"L1104":150,"L1102":199}},"L2004":{"prerequisite":[],"predecessor":[],"successor":["L2003","L2002","L2001"],"bundle":[],"software":["biasfx"],"upgrade":{}},"L2001":{"prerequisite":[],"predecessor":["L2004","L2003","L2002"],"successor":[],"bundle":[],"software":["biasfx"],"upgrade":{"L2002":99}},"L1004":{"prerequisite":[],"predecessor":[],"successor":["L1003","L1002","L1001"],"bundle":[],"software":["bias"],"upgrade":{}},"L2002":{"prerequisite":[],"predecessor":["L2004","L2003"],"successor":["L2001"],"bundle":[],"software":["biasfx"],"upgrade":{}},"C1015":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1009":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1022":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1025":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L1102":{"prerequisite":[],"predecessor":["L1104","L1103"],"successor":["L1101"],"bundle":[],"software":["amp2"],"upgrade":{"L1103":99,"L1001":100,"L1002":50,"L1104":100}},"L4001":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["mastering"],"upgrade":{}},"C1001":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1002":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1013":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1016":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"C1017":{"prerequisite":[],"predecessor":[],"successor":[],"bundle":[],"software":["celestionir"],"upgrade":{}},"L2103":{"prerequisite":[],"predecessor":[],"successor":["L2102","L2101"],"bundle":[],"software":["fx2"],"upgrade":{"L1103":20,"L1101":20,"L2002":50,"L1102":20}},"L2102":{"prerequisite":[],"predecessor":["L2103"],"successor":["L2101"],"bundle":[],"software":["fx2"],"upgrade":{"L1103":20,"L1101":20,"L2001":100,"L2002":50,"L1102":20,"L2103":99}},"L2101":{"prerequisite":[],"predecessor":["L2103","L2102"],"successor":[],"bundle":[],"software":["fx2"],"upgrade":{"L1103":20,"L1101":20,"L2001":100,"L2002":50,"L1102":20,"L2103":99,"L2102":199}},"L1114":{"prerequisite":["L1103","L1101","L1102","L2103","L2102","L2101"],"predecessor":[],"successor":[],"bundle":[],"software":["celestion-classic"],"upgrade":{},"prerequisite_logic":"or"}}}    

  // Old One
  // data.promotions = {
  //   "promotion":{
  //     "onLive":"",
  //     "active":"",
  //     "order":[
  //      "0"
  //     ],    
  //     "queue":{
  //       "0":{
  //         "promotionId":"0",
  //         "name":"Black Friday Promotion",
  //         "startDate":"2018/12/03",
  //         "endDate":"2018/12/06"
  //       }                     
  //     }
  //   },
  //   "priceSet":{
  //     "active":"",
  //     "items":{
  //       "0":[
  //         {
  //           "promotionId":"0",
  //           "sku":"L1101",
  //           "name":"BIAS AMP Elite",
  //           "salePrice":99,
  //           "price":199             
  //         }        
  //       ]
  //     }
  //   } 
  // };