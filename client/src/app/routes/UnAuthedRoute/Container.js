import { connect } from 'react-redux';
import UnAuthedRoute from './UnAuthedRoute';
import { paths } from '@app/pages';

const mapStateToProps = state => ({
  unauthenticated: !state.auth.authenticated
});

const ConnectedUnAuthedRoute = connect(
  mapStateToProps,
  null
)(UnAuthedRoute);
ConnectedUnAuthedRoute.defaultProps = { path: paths.LOGIN };
export default ConnectedUnAuthedRoute;
