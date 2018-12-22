import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { applyPromotion } from "../../../modules/scheduledPrice";
import SetPriceRule from './SetPriceRule';

const mapStateToProps = state => ({
  isLoading_scheduledPrice: state.scheduledPrice.isLoading,
  errMsg_scheduledPrice: state.scheduledPrice.errMsg,
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  postResponse: state.scheduledPrice.postResponse,

  isLoading_currentBCPrice: state.currentBCPrice.isLoading,
  errMsg_currentBCPrice: state.currentBCPrice.errMsg,   
  bcPrice: state.currentBCPrice.priceList,

  isLoading_licenseRule: false,
  errMsg_licenseRule: '',   
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ applyPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SetPriceRule);