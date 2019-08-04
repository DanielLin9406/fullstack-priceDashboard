import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SetPriceRule from './SetPriceRule';

const mapStateToProps = state => ({
  active: state.scheduledPrice.promotion.active,
  loading: [state.scheduledPrice.isLoading, state.currentBCPrice.isLoading],
  errMsg: [state.scheduledPrice.errMsg, state.currentBCPrice.errMsg]
});

// const mapDispatchToProps = dispatch =>
//   bindActionCreators({ hideEditPromotion }, dispatch);

export default connect(
  mapStateToProps,
  null
)(SetPriceRule);
