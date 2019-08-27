import axios from 'axios';

export default (url, host, port, ver) => {
  const baseURL = port ? `${host}:${port}` : `${host}`;
  const withVerUrl = ver ? `${ver}/${url}` : `${url}`;
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return {
    get: token => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.get(`${withVerUrl}`);
    },
    post: (token, dataBody) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.post(`${withVerUrl}`, dataBody);
    },
    put: (token, id, dataBody) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.put(`${withVerUrl}/${id}`, dataBody);
    },
    delete: (token, id) => {
      instance.defaults.headers.common.Authorization = `Bearer ${token}`;
      return instance.delete(`${withVerUrl}/${id}`);
    }
  };
};
