import env from './env';

const isProd = env.NODE_ENV === 'production';

const keys = {
  dbURL: isProd ? env.DATABASE_URL_PROD : env.DATABASE_URL_DEV,
  redisHost: isProd ? env.REDIS_HOST_PROD : env.REDIS_HOST_DEV,
  redisPort: isProd ? env.REDIS_PORT_PROD : env.REDIS_PORT_DEV,
  authHost: isProd ? env.AUTH_HOST_PROD : env.AUTH_HOST_DEV,
  authPort: isProd ? env.AUTH_PORT_PROD : env.AUTH_PORT_DEV,
  authVer: isProd ? env.AUTH_VER_PROD : env.AUTH_VER_DEV
};

export default keys;
