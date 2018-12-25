import { hot } from "react-hot-loader";
import React, { Component } from "react";

class ViewPriceRule extends Component{
  componentDidUpdate(){
    // console.log('priceList', this.props.currentItemPriceList)
  }
  render(){
    return (
      <div className="row-group-container item-price-list-container">
        <ul>
        {
          this.props.currentItemPriceList ? 
          this.props.currentItemPriceList.map((ele, index) => {
            return (
              <li key={index}>
                <div className="item-container">
                  <p>{ele.name}</p>
                </div> 
                <div className="price-container">
                  <p>${ele.salePrice}</p>
                </div> 
                <div>
                  <button data-index={index} onClick={this.props.rmItem}>X</button>
                </div>
              </li>                                         
            )
          }) : ''
        }
        </ul>
      </div>
    )
  }
}

export default hot(module)(ViewPriceRule)