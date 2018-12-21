import { connect } from "react-redux";

import CurrentPriceRule from './CurrentPriceRule';

const mapStateToProps = state => ({
  isLoading_scheduledPrice: state.scheduledPrice.isLoading,
  errMsg_scheduledPrice: state.scheduledPrice.errMsg,
  promotion: state.scheduledPrice.promotion, 
  priceSet: state.scheduledPrice.priceSet,
  
  isLoading_currentBCPrice: state.currentBCPrice.isLoading,
  errMsg_currentBCPrice: state.currentBCPrice.errMsg,   
  bcPrice: state.currentBCPrice.priceList,

  isLoading_licenseRule: state.licenseRule.isLoading,
  errMsg_licenseRule: state.licenseRule.errMsg,    
  licenseRule: state.licenseRule.rule,
});

export default connect(
  mapStateToProps,
  null
)(CurrentPriceRule);