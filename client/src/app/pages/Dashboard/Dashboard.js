import { hot } from "react-hot-loader";
import React, { Component } from "react";
import Calendar from '../../components/Calendar/Container';
import CurrentPriceRule from '../../components/CurrentPriceRule/Container';
import QueuePriceRule from "../../components/QueuedPriceRule/Container";
import CurrentPromotion from "../../components/CurrentPromotion/Container";
import SetPriceRule from "../../components/SetPriceRule/Container";
import UserSection from '../../components/UserSection/Container';

class Dashboard extends Component {  
  componentDidCatch(error, info) {
    logError(error, { extra: info })
  }

  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }

  componentDidMount() {
    this.loadPromotionData();
    this.loadBCPrice();
    this.loadPGLicense();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('props', this.props);
  }

  loadPromotionData = () => {
    this.props.asyncGetPromotion();
  }
  loadBCPrice = () => {
    this.props.asyncGetBCPrice();
  }
  loadPGLicense = () => {
    this.props.asyncGetLicenseRule();    
  }
}

const WrappedDashboard = ({...props}) => {
  return (
    <Dashboard {...props}>
      <CurrentPromotion />
      <UserSection />
      <Calendar /> 
      <SetPriceRule />
      <QueuePriceRule />
      <CurrentPriceRule />
    </Dashboard>
  )
}


export default hot(module)(WrappedDashboard);
