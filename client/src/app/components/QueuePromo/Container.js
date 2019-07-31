import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  loadPromotion,
  sortPromotion,
  asyncRemovePromotion
} from '@app/modules/scheduled-price/scheduledPrice';
import QueuePromo from './QueuePromo';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  isLoading: state.scheduledPrice.isLoading,
  loading: [state.scheduledPrice.isLoading],
  errMsg: [state.scheduledPrice.errMsg],
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { loadPromotion, sortPromotion, asyncRemovePromotion },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueuePromo);
