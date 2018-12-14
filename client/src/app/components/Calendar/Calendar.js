import { hot } from "react-hot-loader";
import React, { Component } from "react";
import Cal from 'react-calendar'

class Calendar extends Component {
  state = {
    date: new Date()
  }

  componentDidMount(){
    console.log(this.props)
  }

  render(){
    return (
      <div>
        <Cal 
          activeStartDate={this.state.date}
          value={this.state.date}
        />
      </div>
    )
  }


}

export default hot(module)(Calendar);