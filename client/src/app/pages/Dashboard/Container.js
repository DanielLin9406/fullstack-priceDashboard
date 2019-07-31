import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncGetPromotion } from '@app/modules/scheduledPrice/scheduledPrice';
import { asyncGetBCPrice } from '@app/modules/currentBCPrice/currentBCPrice';
import WrappedDashboard from './Dashboard';

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncGetPromotion, asyncGetBCPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDashboard);
