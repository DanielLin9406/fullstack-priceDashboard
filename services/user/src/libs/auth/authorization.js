import { OAuth2Client } from 'google-auth-library';
import createError from 'http-errors';
import key from '../../config/keys';
const OAUTH_INFO = {
  id: key.clientID,
  key: key.clientSecret,
  redirectUri: key.redirectURI
};
const oauth = new OAuth2Client(
  OAUTH_INFO.id,
  OAUTH_INFO.key,
  OAUTH_INFO.redirectUri
);

const ensureAuthenticated = async (req, res, next) => {
  if (!(req.headers && req.headers.authorization)) {
    return next(createError(401, 'Unauthorized'));
  }
  const token = req.headers.authorization.split(' ')[1];
  try {
    const validateResult = await oauth.verifyIdToken({
      idToken: token,
      audience: OAUTH_INFO.id
    });
    const payload = validateResult.getPayload();
    req.user = parseInt(payload.sub, 10);
    return next();
  } catch (err) {
    return next(createError(500, 'OAuth failed!'));
  }
};

// import jwt from 'jsonwebtoken';
// const getMe = async req => {
//   const token = req.headers["x-token"];

//   if (token) {
//     try {
//       return await jwt.verify(token, process.env.SECRET);
//     } catch (e) {
//       throw "Your session expired. Sign in again.";
//     }
//   }
// };

export default ensureAuthenticated;
