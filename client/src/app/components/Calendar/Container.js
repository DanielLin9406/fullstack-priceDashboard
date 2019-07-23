import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPromotion } from '@app/modules/scheduled-price/scheduledPrice';
import Calendar from './Calendar';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  isLoading: state.scheduledPrice.isLoading,
  errMsg: state.scheduledPrice.errMsg
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
