import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  asyncApplyPromotion,
  asyncEditPromotion
} from '../../../modules/scheduled-price/scheduledPrice';
import SetPriceRule from './SetPriceRule';

const mapStateToProps = state => ({
  isLoading_scheduledPrice: state.scheduledPrice.isLoading,
  errMsgScheduledPrice: state.scheduledPrice.errMsg,
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  postResponse: state.scheduledPrice.postResponse,
  removedPromoId: state.scheduledPrice.removedPromoId,

  isLoading_currentBCPrice: state.currentBCPrice.isLoading,
  errMsg_currentBCPrice: state.currentBCPrice.errMsg,
  bcPrice: state.currentBCPrice.priceList,

  isLoading_licenseRule: false,
  errMsgLicenseRule: '',

  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncApplyPromotion, asyncEditPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPriceRule);
