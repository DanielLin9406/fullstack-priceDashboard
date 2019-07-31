import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncGetPromotion } from '@app/modules/scheduled-price/scheduledPrice';
import { asyncGetBCPrice } from '@app/modules/current-BC-price/currentBCPrice';
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
