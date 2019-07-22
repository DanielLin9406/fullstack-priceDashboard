import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadDefaultPromotion } from '../../../modules/scheduled-price/scheduledPrice';
import CurrentPriceRule from './CurrentPriceRule';

const mapStateToProps = state => ({
  isLoading_scheduledPrice: state.scheduledPrice.isLoading,
  errMsgScheduledPrice: state.scheduledPrice.errMsg,
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,

  isLoading_currentBCPrice: state.currentBCPrice.isLoading,
  errMsgCurrentBCPrice: state.currentBCPrice.errMsg,
  bcPrice: state.currentBCPrice.priceList,

  isLoading_licenseRule: state.licenseRule.isLoading,
  errMsg_licenseRule: state.licenseRule.errMsg,
  licenseRule: state.licenseRule.rule
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadDefaultPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPriceRule);
