import scheduledPrice from './scheduledPrice';
import licenseRule from './licenseRule';
import currentBCPrice from './currentBCPrice';


export default function combineReducers(state = {}, action) {
  return {
    scheduledPrice: scheduledPrice(state.scheduledPrice, action),
    licenseRule:licenseRule(state.licenseRule, action),
    currentBCPrice:currentBCPrice(state.currentBCPrice, action)
  }
}