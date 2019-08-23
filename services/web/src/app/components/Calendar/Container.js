import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loadPromotion } from '@app/modules/promotions/promotions';
import Calendar from './Calendar';

const mapStateToProps = state => ({
  promotion: state.scheduledPrice.promotion,
  errMsg: [state.scheduledPrice.errMsg],
  loading: [state.scheduledPrice.isLoading]
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ loadPromotion }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar);
