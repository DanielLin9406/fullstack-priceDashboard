import axios from 'axios';

/**
 * Middleware to ensure user is authenticated by calling the User Service
 * @param {Object} keys - Configuration keys containing auth service details
 * @returns {Function} Express middleware
 */
const ensureAuthenticated = (keys) => {
  const middleware = async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') {
      req.user = 1;
      return next();
    }

    try {
      if (!req.headers.authorization) {
        throw new Error('No authorization header present');
      }

      const baseURL = keys.authPort
        ? `${keys.authHost}:${keys.authPort}`
        : `${keys.authHost}`;
      const pathName = keys.authVer ? `/${keys.authVer}/user` : `/user`;
      
      const response = await axios({
        method: 'get',
        url: `${baseURL}${pathName}`,
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`
        }
      });

      req.user = response.data.user;
      return next();
    } catch (err) {
      // Pass error to next middleware (usually global error handler)
      // Or return 401 directly here
      return res.status(401).send({ error: 'Unauthorized' });
    }
  };

  return middleware;
};

export default ensureAuthenticated;
