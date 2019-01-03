import { connect } from "react-redux";
import SecuredRoute from "./SecuredRoute";

const mapStateToProps = state => ({
  authenticated: state.auth.authenticated
});

export default connect(
  mapStateToProps,
  null
)(SecuredRoute);