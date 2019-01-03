import { hot } from "react-hot-loader";
import React, { Component } from "react";
import Calendar from '../../components/Calendar/Container';
import CurrentPriceRule from '../../components/CurrentPriceRule/Container';
import QueuePriceRule from "../../components/QueuedPriceRule/Container";
import CurrentPromotion from "../../components/CurrentPromotion/Container";
import SetPriceRule from "../../components/SetPriceRule/Container";
import UserSection from '../../components/UserSection/Container';

class ConsoleRoute extends Component {
  
  componentDidCatch(error, info) {
    logError(error, { extra: info })
  }

  render() {
    return (
      <>
        <CurrentPromotion />
        <UserSection />
        <Calendar /> 
        <SetPriceRule />
        <QueuePriceRule />
        <CurrentPriceRule />
      </>
    );
  }

  componentDidMount() {
    this.loadPromotionData();
    this.loadBCPrice();
    this.loadPGLicense();
  }

  componentDidUpdate(prevProps, prevState) {
    // if (this.state.profileOrError === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      // this.loadPromotionData();
      // this.loadBCPrice();
      // this.loadPGLicense();
    // }
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

export default hot(module)(ConsoleRoute);
