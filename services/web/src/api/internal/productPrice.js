import createAxiosInstance from './createRestApi';

/**
 * API client for the 'prices' service.
 * Configured with base URL, port, and version from the environment.
 * 
 * @type {import('axios').AxiosInstance}
 */
export default createAxiosInstance(
  'prices',
  `${app.env.API_HOST.prices}`,
  `${app.env.API_PORT.prices}`,
  `${app.env.API_VER.prices}`
);
