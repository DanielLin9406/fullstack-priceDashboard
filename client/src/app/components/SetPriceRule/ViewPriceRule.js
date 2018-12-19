import { hot } from "react-hot-loader";
import React, { Component } from "react";

class ViewPriceRule extends Component{

  render(){
    return (
      <div className="row-group-container item-price-list-container">
        <ul>
          <li>
          <div className="item-container">
            <p>AMP2 PRO</p>
          </div>
          <div className="price-container">
            <p>$30</p>
          </div>
          <div>
            <button>X</button>
          </div>   
          </li>
        </ul>
      </div>
    )
  }
}

export default hot(module)(ViewPriceRule)