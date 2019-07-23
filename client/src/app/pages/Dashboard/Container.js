import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncGetPromotion } from '@app/modules/scheduled-price/scheduledPrice';
import { asyncGetBCPrice } from '@app/modules/current-BC-price/currentBCPrice';
import { asyncGetLicenseRule } from '@app/modules/license-rule/licenseRule';
import WrappedDashboard from './Dashboard';

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { asyncGetPromotion, asyncGetBCPrice, asyncGetLicenseRule },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedDashboard);
