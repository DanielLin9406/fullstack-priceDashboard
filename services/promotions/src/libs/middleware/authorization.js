import jwt from "jsonwebtoken";

const getMe = async req => {
  const token = req.headers["x-token"];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw "Your session expired. Sign in again.";
    }
  }
};

export default getMe;
