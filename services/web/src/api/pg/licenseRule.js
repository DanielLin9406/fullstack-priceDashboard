import createAxiosInstance from './createRestApi';

export default createAxiosInstance(
  'upgrade-rules',
  `${app.env.API_PORT['upgradeRule']}`
);
