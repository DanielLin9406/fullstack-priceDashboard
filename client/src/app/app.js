import React, { Component } from "react";
import Calendar from './components/Calendar/Container';
import CurrentPriceRule from './components/CurrentPriceRule/Container';
import QueuePriceRule from "./components/QueuedPriceRule/Container";
import CurrentPromotion from "./components/CurrentPromotion/Container";
import SetPriceRule from "./components/SetPriceRule/Container";

import './app.scss';

class App extends Component {

  render() {
    return (
      <div id="app">
        <CurrentPromotion />
        <Calendar /> 
        <SetPriceRule />
        <QueuePriceRule />
        <CurrentPriceRule />
      </div>
    );
  }

  componentDidMount() {
    this.loadPromotionData();
    this.loadBCPrice();
    this.loadPGLicense();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.profileOrError === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      // this.loadPromotionData();
      // this.loadBCPrice();
      // this.loadPGLicense();
    }
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

export default App;
