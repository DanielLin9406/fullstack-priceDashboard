import { hot } from "react-hot-loader";
import React, { Component } from "react";
import Calendar from '../../components/Calendar/Container';
import CurrentPriceRule from '../../components/CurrentPriceRule/Container';
import QueuePromo from "../../components/QueuePromo/Container";
import CurrentPromotion from "../../components/CurrentPromotion/Container";
import SetPriceRule from "../../components/SetPriceRule/Container";
import UserSection from '../../components/UserSection/Container';

class Dashboard extends Component {  
  // componentDidCatch(error, info) {
    // logError(error, { extra: info })
  // }

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
    // console.log('props', this.props);

  }

  loadPromotionData = () => {
    this.props.asyncGetPromotion({user: this.props.user});
  }
  loadBCPrice = () => {
    this.props.asyncGetBCPrice({user: this.props.user});
  }
  loadPGLicense = () => {
    this.props.asyncGetLicenseRule({user: this.props.user});    
  }
}

const WrappedDashboard = ({...props}) => {
  return (
    <Dashboard {...props}>
      <CurrentPromotion />
      <UserSection />
      <Calendar /> 
      <SetPriceRule />
      <QueuePromo />
      <CurrentPriceRule />
    </Dashboard>
  )
}


export default hot(module)(WrappedDashboard);
