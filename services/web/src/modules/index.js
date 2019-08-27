import scheduledPrice from './promotions/promotions';
import licenseRule from './upgrade-rules/upgrade-rules';
import productPrice from './productPrice/productPrice';
import auth from './auth/auth';

export default function combineReducers(state = {}, action) {
  return {
    auth: auth(state.auth, action),
    scheduledPrice: scheduledPrice(state.scheduledPrice, action),
    licenseRule: licenseRule(state.licenseRule, action),
    productPrice: productPrice(state.productPrice, action)
  };
}
