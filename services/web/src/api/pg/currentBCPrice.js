import createAxiosInstance from './createRestApi';

export default createAxiosInstance('prices', `${app.env.API_PORT['price']}`);
