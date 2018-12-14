import React, { Component } from "react";
import Calendar from './components/Calendar/Container';

class App extends Component {
  constructor(props) {
    super(props);

    this.loadPromotionData = this.loadPromotionData.bind(this);
  }
  render() {
    return (
      <div id="app">
        <Calendar />      
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

  loadPromotionData(){
    this.props.asyncGetPromotion();
  }
}

export default App;
