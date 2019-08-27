import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncEditPromotion } from '@app/modules/promotions/promotions';
import EditPromotion from './EditPromotion';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  priceList: state.productPrice.priceList,
  user: state.auth.user,

  loading: [state.scheduledPrice.isLoading, state.productPrice.isLoading],

  errMsg: [state.scheduledPrice.errMsg, state.productPrice.errMsg]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncEditPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPromotion);
