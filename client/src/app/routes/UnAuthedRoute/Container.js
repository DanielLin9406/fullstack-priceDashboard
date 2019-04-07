import { connect } from "react-redux";
import UnAuthedRoute from "./UnAuthedRoute";
import { pagePaths } from '@app/pages/pagesInfo'

const mapStateToProps = state => ({
  unauthenticated: !state.auth.authenticated
});

const ConnectedUnAuthedRoute = connect(
  mapStateToProps,
  null
  )(UnAuthedRoute);
ConnectedUnAuthedRoute.defaultProps = { path: pagePaths.LOGIN }
export default ConnectedUnAuthedRoute
