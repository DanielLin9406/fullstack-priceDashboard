import createAxiosInstance from './createRestApi';

export default createAxiosInstance(
  'prices',
  `${app.env.API_HOST.prices}`,
  `${app.env.API_PORT.prices}`,
  `${app.env.API_VER.prices}`
);
