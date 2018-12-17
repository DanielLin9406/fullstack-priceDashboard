import { hot } from "react-hot-loader";
import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';

import './SetPriceRule.scss';

class SetPriceRule extends Component{
  constructor(props){
    super(props);
    this.state = {
      selectedDay: undefined,
    }
    
  }
  handleDayChange = (day) => {
    this.setState({ 
      selectedDay: day 
    });
  }
  render(){
    return (
      <section>
        <h2>Set Price Rule</h2>
        <div>
          <label htmlFor="">Name</label>
          <input type="text"/>
        </div>
        <div>
          <div>
            <label htmlFor="">From</label>
            <DayPickerInput onDayChange={this.handleDayChange} />
          </div>
          <div>
            <label htmlFor="">To</label>
            <DayPickerInput onDayChange={this.handleDayChange} />
          </div>
        </div>
        <button>Add schedule</button>
      </section>
    )
  }
}

export default hot(module)(SetPriceRule)