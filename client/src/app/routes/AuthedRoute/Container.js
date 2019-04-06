import { connect } from "react-redux";
import AuthedRoute from "./AuthedRoute";

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  null
)(AuthedRoute);