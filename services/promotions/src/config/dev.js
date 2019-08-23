const keys = {
  dbURL: process.env.DATABASE_URL_DEV,
  redisHost: process.env.REDIS_HOST_DEV,
  redisPort: process.env.REDIS_PORT_DEV,
  authHost: process.env.AUTH_HOST_DEV,
  authPort: process.env.AUTH_PORT_DEV,
  authVer: process.env.AUTH_VER_DEV,
  pricesHost: process.env.PRICES_HOST_DEV,
  pricesPort: process.env.PRICES_PORT_DEV,
  pricesVer: process.env.PRICES_VER_DEV
};

export default keys;
