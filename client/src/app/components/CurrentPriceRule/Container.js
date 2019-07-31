import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadDefaultPromotion } from '@app/modules/scheduled-price/scheduledPrice';
import { asyncGetLicenseRule } from '@app/modules/license-rule/licenseRule';
import CurrentPriceRule from './CurrentPriceRule';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  bcPrice: state.currentBCPrice.priceList,
  licenseRule: state.licenseRule.rule,

  loading: [
    state.scheduledPrice.isLoading,
    state.currentBCPrice.isLoading,
    state.licenseRule.isLoading
  ],
  errMsg: [
    state.scheduledPrice.errMsg,
    state.currentBCPrice.errMsg,
    state.licenseRule.errMsg
  ],

  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadDefaultPromotion, asyncGetLicenseRule }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPriceRule);
