import scheduledPrice from './promotions/promotions';
import licenseRule from './upgrade-rules/upgrade-rules';
import currentBCPrice from './currentBCPrice/currentBCPrice';
import auth from './auth/auth';

export default function combineReducers(state = {}, action) {
  return {
    auth: auth(state.auth, action),
    scheduledPrice: scheduledPrice(state.scheduledPrice, action),
    licenseRule: licenseRule(state.licenseRule, action),
    currentBCPrice: currentBCPrice(state.currentBCPrice, action)
  };
}
