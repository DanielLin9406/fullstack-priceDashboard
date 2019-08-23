import request from 'request-promise';
import keys from '../../config/keys';

let ensureAuthenticated = (req, res, next) => {
  const baseURL = keys.authPort
    ? `${keys.authHost}:${keys.authPort}`
    : `${keys.authHost}`;
  const pathName = keys.authVer ? `/${keys.authVer}/user` : `/user`;
  const options = {
    method: 'GET',
    uri: `${baseURL}${pathName}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`
    }
  };

  return request(options)
    .then(response => {
      req.user = response.user;
      return next();
    })
    .catch(err => {
      return next(err);
    });
};

if (process.env.NODE_ENV === 'test') {
  ensureAuthenticated = (req, res, next) => {
    req.user = 1;
    return next();
  };
}

export default ensureAuthenticated;
