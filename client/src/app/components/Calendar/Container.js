import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { loadPromotion, loadCurrentPrice } from "../../../modules/scheduledPrice";
import Calendar from './Calendar';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPromotion, loadCurrentPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);