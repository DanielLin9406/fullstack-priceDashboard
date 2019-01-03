import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loadPromotion, sortPromotion, removePromotion } from "../../../modules/scheduled-price/scheduledPrice";
import QueuePriceRule from './QueuePriceRule';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  isLoading: state.scheduledPrice.isLoading,
  errMsg: state.scheduledPrice.errMsg,  
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPromotion, sortPromotion, removePromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueuePriceRule);