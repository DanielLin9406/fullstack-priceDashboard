import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { asyncGetPromotion } from '@app/modules/promotions/promotions';
import { asyncGetPrice } from '@app/modules/productPrice/productPrice';
import Dashboard from './Dashboard';

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncGetPromotion, asyncGetPrice }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
