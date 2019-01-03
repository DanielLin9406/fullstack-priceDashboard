import { connect } from "react-redux";

import paths from '../paths'
import LoginRoute from "./LoginRoute";

const mapStateToProps = state => ({
  unauthenticated: !state.auth.authenticated
});

const ConnectedLoginRoute = connect(
  mapStateToProps,
  null
  )(LoginRoute)

ConnectedLoginRoute.defaultProps = { path: paths.LOGIN }
export default ConnectedLoginRoute;