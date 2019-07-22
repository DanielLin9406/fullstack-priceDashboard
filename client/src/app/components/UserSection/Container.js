import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { handleLogout } from '../../../modules/auth/auth';
import UserSection from './UserSection';

const mapStateToProps = state => ({
  user: state.auth.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ handleLogout }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserSection);
