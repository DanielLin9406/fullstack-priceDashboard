const keys = {
  dbURL: process.env.DATABASE_URL_PROD,
  redisHost: process.env.REDIS_HOST_PROD,
  redisPort: process.env.REDIS_PORT_PROD,
  authHost: process.env.AUTH_HOST_PROD,
  authPort: process.env.AUTH_PORT_PROD,
  authVer: process.env.AUTH_VER_PROD,
  pricesHost: process.env.PRICES_HOST_PROD,
  pricesPort: process.env.PRICES_PORT_PROD,
  pricesVer: process.env.PRICES_VER_PROD
};

export default keys;
