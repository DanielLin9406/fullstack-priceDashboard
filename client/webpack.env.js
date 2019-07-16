import packageJSON from './package.json';
import { paths } from './webpack.const';

const ENV = process.env.NODE_ENV || 'development';
const VARIABLES = {
  DEBUGGING: false,
  MONITORING: false,
  MONITORING: true,
  ENVIRONMENT_NAME: ENV,
  VERSION: packageJSON.version,
  GAPI_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  API_URL: paths.API_URL[process.env.NODE_ENV_API]
};

const ENV_VARIABLES = {
  production: {
    'process.env.NODE_ENV': 'production',
    'app.env': {
      ...VARIABLES
    }
  },
  development: {
    'process.env.NODE_ENV': 'development',
    'app.env': {
      ...VARIABLES
    }
  }
};

export default {
  name: ENV,
  isDev: ENV === 'development',
  variables: ENV_VARIABLES[ENV]
  // pgInternalApiUrl: ENV_VARIABLES[ENV]['app.env'].API_URL
};
