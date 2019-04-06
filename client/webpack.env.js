import packageJSON from './package.json'
import { paths } from './webpack.const'

const ENV = process.env.NODE_ENV || "development";

const VARIABLES = {
  DEBUGGING: false,
  MONITORING: false,
  ENVIRONMENT_NAME: ENV,
  VERSION: packageJSON.version,
  GAPI_CLIENT_ID:'980338893576-14grhjqtoieo92bhuf8hfs29ubufcig7.apps.googleusercontent.com', 
}


const ENV_VARIABLES = {
  production: {
    'process.env.NODE_ENV': 'production',
    'app.env':{
      ...VARIABLES,
      MONITORING: true,
      PG_INTERNAL_API_URL: paths.pgInternalApiUrl[process.env.NODE_ENV_API]      
    }    
  },
  development:{
    'process.env.NODE_ENV': 'development',
    'app.env':{
      ...VARIABLES,
      MONITORING: true,
      PG_INTERNAL_API_URL: paths.pgInternalApiUrl[process.env.NODE_ENV_API]
    }    
  }, 
}

export default {
  name: ENV,
  isDev: ENV === 'development',
  variables: ENV_VARIABLES[ENV],
  pgInternalApiUrl: ENV_VARIABLES[ENV]['app.env'].PG_INTERNAL_API_URL
}