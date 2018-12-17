import React, { Component } from "react";
import Calendar from './components/Calendar/Container';
import CurrentPriceRule from './components/CurrentPriceRule/Container';
import QueuePriceRule from "./components/QueuedPriceRule/Container";
import CurrentPromotion from "./components/CurrentPromotion/Container";
import SetPriceRule from "./components/SetPriceRule/Container";

class App extends Component {

  render() {
    return (
      <div id="app">
        <Calendar /> 
        <CurrentPromotion />
        <QueuePriceRule />
        <SetPriceRule />
        <CurrentPriceRule />
      </div>
    );
  }

  componentDidMount() {
    this.loadPromotionData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.profileOrError === null) {
      // At this point, we're in the "commit" phase, so it's safe to load the new data.
      this.loadPromotionData();
    }
  }

  loadPromotionData = () => {
    this.props.asyncGetPromotion();
  }
}

export default App;
