import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { asyncGetPromotion } from "../modules/scheduledPrice";
import { asyncGetBCPrice } from "../modules/currentBCPrice";
import { asyncGetLicenseRule } from "../modules/licenseRule";
import App from "./app";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncGetPromotion, asyncGetBCPrice, asyncGetLicenseRule }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(App);