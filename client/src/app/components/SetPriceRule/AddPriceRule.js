import { hot } from "react-hot-loader";
import React, { Component } from "react";

class AddPriceRule extends Component{
  componentDidMount(){
    // console.log('', this.props.bcPriceList);
  }
  render(){
    return (
      <div className="row-group-container add-item-price-container">
        <form onSubmit={this.props.addItem}>
          <div>Current Promotion Id: {this.props.currentPromotionId}</div>
          <div className="item-container">
            <label htmlFor="">Product Name</label>
            <select name="productDetails" id="productDetails">
              {this.props.bcPriceList.map((ele, index) => {
                return (
                  <option key={index} value={`${ele.sku}-${ele.name}-${ele.price}`}>{ele.name}</option>  
                )
              })}
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
        <div>{this.errMsg}</div>
      </div>      
    )
  }
}

export default hot(module)(AddPriceRule)