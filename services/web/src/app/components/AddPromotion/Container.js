import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncApplyPromotion } from '@app/modules/promotions/promotions';
import AddPromotion from './AddPromotion';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  priceList: state.productPrice.priceList,
  user: state.auth.user,

  loading: [state.scheduledPrice.isLoading, state.productPrice.isLoading],

  errMsg: [state.scheduledPrice.errMsg, state.productPrice.errMsg]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncApplyPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddPromotion);
