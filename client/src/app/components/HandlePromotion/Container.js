import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  asyncApplyPromotion,
  asyncEditPromotion
} from '@app/modules/scheduledPrice/scheduledPrice';
import HandlePriceRule from './HandlePriceRule';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  priceSet: state.scheduledPrice.priceSet,
  statusCode: state.scheduledPrice.statusCode,
  removedPromoId: state.scheduledPrice.removedPromoId,
  bcPrice: state.currentBCPrice.priceList,
  user: state.auth.user,

  loading: [state.scheduledPrice.isLoading, state.currentBCPrice.isLoading],

  errMsg: [state.scheduledPrice.errMsg, state.currentBCPrice.errMsg]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncApplyPromotion, asyncEditPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HandlePriceRule);
