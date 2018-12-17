import { connect } from "react-redux";

import CurrentPriceRule from './CurrentPriceRule';

const mapStateToProps = state => ({
  priceSet: state.scheduledPrice.priceSet
});

export default connect(
  mapStateToProps,
  null
)(CurrentPriceRule);