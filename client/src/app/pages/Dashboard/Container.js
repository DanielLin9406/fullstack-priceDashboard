import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { asyncGetPromotion } from "../../../modules/scheduled-price/scheduledPrice";
import { asyncGetBCPrice } from "../../../modules/current-BC-price/currentBCPrice";
import { asyncGetLicenseRule } from "../../../modules/license-rule/licenseRule";
import WrappedDashboard from "./Dashboard";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncGetPromotion, asyncGetBCPrice, asyncGetLicenseRule }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(WrappedDashboard);