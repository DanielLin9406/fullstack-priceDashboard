// import Request from '@shinin/request';
import axios from 'axios';
import host from './host';

// export default uri => ({
//   fetchList: token =>
//     Request.get(`${host}/${uri}`)
//       .bearer(token)
//       .acceptJson(),
//   create: (token, model) =>
//     Request.post(`${host}/${uri}`)
//       .bearer(token)
//       .jsonBody(model)
//       .acceptJson(),
//   update: (token, id, body) =>
//     Request.put(`${host}/${uri}/${id}`)
//       .bearer(token)
//       .jsonBody(body)
//       .acceptJson(),
//   remove: (token, id) =>
//     Request.delete(`${host}/${uri}/${id}`)
//       .bearer(token)
//       .acceptJson()
// });

export default url => {
  const instance = axios.create({
    baseURL: `${host}`,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    get: token => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.get(`${url}`);
    },
    post: (token, dataBody) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.post(`${url}`, dataBody);
    },
    put: (token, id, dataBody) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.put(`${url}/${id}`, dataBody);
    },
    delete: (token, id) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.delete(`${url}/${id}`);
    }
  };
};
