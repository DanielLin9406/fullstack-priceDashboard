import request from 'request-promise';

let ensureAuthenticated = (req, res, next) => {
  const options = {
    method: 'GET',
    uri: `${process.env.AUTH_HOST_DEV}`,
    json: true,
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`
    }
  };
  // return next();
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
