import { hot } from "react-hot-loader";
import React, { Component } from "react";

class AddPriceRule extends Component{
  render(){
    return(
      <div className="row-group-container add-item-price-container">
        <form onSubmit={this.props.addItem}>
          <div className="item-container">
            <label htmlFor="">Product Name</label>
            <select name="productDetails" id="productDetails">
              <option value="L1101-BIAS_AMP2_pro">AMP2 PRO</option>
              <option value="L1102-BIAS_AMP2_std">AMP2 Std</option>
            </select>
          </div>
          <div className="price-container">
            <label htmlFor="salePrice">SalePrice</label>
            <input id="salePrice" name="salePrice" type="text"/>
          </div>
          <div>
            <button>+</button>
          </div>
        </form>
      </div>      
    )
  }
}

export default hot(module)(AddPriceRule)