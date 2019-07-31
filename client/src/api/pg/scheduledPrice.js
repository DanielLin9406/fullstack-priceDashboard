import createRestApi, { createAxiosInstance } from './createRestApi';

const schedulePriceAXIOSAPI = createAxiosInstance('promotions');

export default createRestApi('promotions');
export { schedulePriceAXIOSAPI };
