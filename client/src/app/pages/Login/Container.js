import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { initAuth, reloadAuth, handleLogin } from '@app/modules/auth/auth';
import Login from './Login';

const mapStateToProps = state => ({
  initialized: state.auth.initialized,
  error: state.auth.error
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ initAuth, reloadAuth, handleLogin }, dispatch);

const ConnectedLogin = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

export default ConnectedLogin;
