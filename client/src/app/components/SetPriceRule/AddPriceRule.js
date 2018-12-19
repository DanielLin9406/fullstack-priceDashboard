import { hot } from "react-hot-loader";
import React, { Component } from "react";

class AddPriceRule extends Component{
  render(){
    return(
      <div className="row-group-container add-item-price-container">
          <div className="item-container">
            <label htmlFor="">Product</label>
            <select name="productName" id="productName">
              <option value="1">AMP2 PRO</option>
              <option value="2">AMP2 Std</option>
            </select>
          </div>
          <div className="price-container">
            <label htmlFor="salePrice">Price</label>
            <input id="salePrice" name="salePrice" type="text"/>
          </div>
          <div>
            <button onClick={this.props.addItem}>+</button>
          </div>
      </div>      
    )
  }
}

export default hot(module)(AddPriceRule)