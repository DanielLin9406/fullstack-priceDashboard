import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { asyncGetPromotion } from "../modules/scheduledPrice";
import App from "./app";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ asyncGetPromotion }, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(App);