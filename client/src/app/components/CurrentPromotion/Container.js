import { connect } from "react-redux";

import CurrentPromotion from './CurrentPromotion';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  isLoading: state.scheduledPrice.isLoading,
  errMsg: state.scheduledPrice.errMsg,
});

export default connect(
  mapStateToProps,
  null
)(CurrentPromotion);