import createAxiosInstance from './createRestApi';
export default createAxiosInstance(
  'promotions',
  `${app.env.API_PORT['promotions']}`
);
