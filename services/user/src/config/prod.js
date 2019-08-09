const keys = {
  dbURL: process.env.DATABASE_URL_PROD,
  redisURL: process.env.REDIS_URL_PROD,
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  redirectURI: process.env.REDIRECT_URI
};

export default keys;
