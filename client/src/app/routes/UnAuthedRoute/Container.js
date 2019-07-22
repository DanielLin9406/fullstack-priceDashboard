import { connect } from 'react-redux';
import { paths } from '@app/pages';
import UnAuthedRoute from './UnAuthedRoute';

const mapStateToProps = state => ({
  unauthenticated: !state.auth.authenticated
});

const ConnectedUnAuthedRoute = connect(
  mapStateToProps,
  null
)(UnAuthedRoute);
ConnectedUnAuthedRoute.defaultProps = { path: paths.LOGIN };
export default ConnectedUnAuthedRoute;
