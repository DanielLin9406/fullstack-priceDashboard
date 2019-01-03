import packageJSON from './package.json'
import { paths } from './webpack.const'

const ENV = process.env.NODE_ENV || "development";

const VARIABLES = {
  DEBUGGING: false,
  MONITORING: false,
  ENVIRONMENT_NAME: ENV,
  VERSION: packageJSON.version,
  GAPI_CLIENT_ID:'', 
}

const ENV_VARIABLES = {
  production: {
    'process.env.NODE_ENV': 'production',
    'app.env':{
      ...VARIABLES,
      MONITORING: true,
      PG_INTERNAL_API_URL: paths.pgInternalApiUrl      
    }    
  },
  staging:{
    'process.env.NODE_ENV': 'staging',
    'app.env':{
      ...VARIABLES,
      MONITORING: true,
      PG_INTERNAL_API_URL: paths.pgInternalStagingApiUrl
    }
  },
  development:{
    'process.env.NODE_ENV': 'development',
    'app.env':{
      ...VARIABLES,
      MONITORING: true,
      PG_INTERNAL_API_URL: paths.pgInternalApiProxyUrl  
    }    
  },
  test: {
    'process.env.NODE_ENV': 'test',
    'app.env': VARIABLES
  }  
}

export default {
  name: ENV,
  isDev: ENV === 'development',
  variables: ENV_VARIABLES[ENV],
  pgInternalApiUrl: ENV_VARIABLES[ENV]['app.env'].PG_INTERNAL_API_URL
}