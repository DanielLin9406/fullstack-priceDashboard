import createAxiosInstance from './createRestApi';
export default createAxiosInstance(
  'promotions',
  `${app.env.API_HOST['promotions']}`,
  `${app.env.API_PORT['promotions']}`,
  `${app.env.API_VER['promotions']}`
);
