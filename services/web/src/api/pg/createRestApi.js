import axios from 'axios';
import host from './host';

export default (url, port) => {
  const baseURL = port ? `${host}:${port}` : `${host}`;
  const instance = axios.create({
    baseURL,
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
