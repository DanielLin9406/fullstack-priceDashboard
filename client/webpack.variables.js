module.exports = {
  production: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'client.env':{
      CLIENT_PATH:""
    }    
  },
  staging:{
    'process.env.NODE_ENV': JSON.stringify('staging'),
    'client.env':{
      CLIENT_PATH:""
    }
  },
  development:{
    'process.env.NODE_ENV': JSON.stringify('development'),
    'client.env':{
      CLIENT_PATH:""
    }    
  }
}