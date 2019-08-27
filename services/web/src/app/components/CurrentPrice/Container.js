import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadDefaultPromotion } from '@app/modules/promotions/promotions';
import { asyncGetLicenseRule } from '@app/modules/upgrade-rules/upgrade-rules';
import CurrentPrice from './CurrentPrice';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  priceList: state.productPrice.priceList,
  licenseRule: state.licenseRule.rule,

  loading: [
    state.scheduledPrice.isLoading,
    state.productPrice.isLoading,
    state.licenseRule.isLoading
  ],
  errMsg: [
    state.scheduledPrice.errMsg,
    state.productPrice.errMsg,
    state.licenseRule.errMsg
  ],

  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadDefaultPromotion, asyncGetLicenseRule }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentPrice);
