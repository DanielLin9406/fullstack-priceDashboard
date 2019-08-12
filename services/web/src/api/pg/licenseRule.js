import createAxiosInstance from './createRestApi';

export default createAxiosInstance(
  'upgrade-rules',
  `${app.env.API_HOST['upgradeRules']}`,
  `${app.env.API_PORT['upgradeRules']}`,
  `${app.env.API_VER['upgradeRules']}`
);
