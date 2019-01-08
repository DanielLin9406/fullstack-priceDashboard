import { hot } from "react-hot-loader";
import React, { Component } from "react";

class ViewPriceRule extends Component{
  componentDidUpdate(){
    // console.log('priceList', this.props.currentItemPriceList)
  }
  render(){
    return (
      <div className="item-price-list-container">
        <ul className="item-price-list">
        {
          this.props.currentItemPriceList ? 
          this.props.currentItemPriceList.map((ele, index) => {
            return (
              <li key={index} className="item-price-item">
                <div className="item-container">
                  <p>{ele.name}</p>
                </div> 
                <div className="price-container">
                  <p>{ele.sale_price}</p>
                </div> 
                <div className="remove-container">
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