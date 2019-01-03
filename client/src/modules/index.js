import scheduledPrice from './scheduled-price/scheduledPrice';
import licenseRule from './license-rule/licenseRule';
import currentBCPrice from './current-BC-price/currentBCPrice';
import auth from './auth/auth'

export default function combineReducers(state = {}, action) {
  return {
    auth: auth(state.auth, action),
    scheduledPrice: scheduledPrice(state.scheduledPrice, action),
    licenseRule: licenseRule(state.licenseRule, action),
    currentBCPrice: currentBCPrice(state.currentBCPrice, action)
  }
}
