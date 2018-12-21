import { hot } from "react-hot-loader";
import React, { Component } from "react";
import PGLicense from '../../../shared/license';

class BCPriceItem extends Component{
  constructor(props){
    super(props)
    this.license = new PGLicense(props.licenseRule)
  }

  getUpdatedPrice = (deduct) => {
    let updatedPrice = this.props.priceProps.sale_price;
    if (typeof updatedPrice === 'number'){
      return `$${updatedPrice - deduct}`;
    } else {
      return `$${(parseInt(updatedPrice.replace(/\$/, '')) - deduct)}`;
    }
  }

  render(){
    return(
      <div>
        <ul className="price-list">
          <li className="price-item item-title">
            <span></span>
            <span>Sale Price</span>
            <span>Price</span>
          </li>
          <li className="price-item">
            <span>Guest</span>
            <span>{this.props.priceProps.sale_price}</span>
            <span>{this.props.priceProps.price}</span>
          </li>           
          {this.props.licenseRule.predecessor.map((ele, index) => {
            const deduct = this.license.calculateDeductible([ele])
            return (
              <li key={index} className="price-item">
                <span>{ele} User</span>
                <span>{this.getUpdatedPrice(deduct)}</span>
                <span>{this.props.priceProps.sale_price}</span>
              </li>              
            )
          })}
        </ul>
      </div>
    )
  }
  componentDidUpdate(){
    // console.log('BCPriceItem', this.props.sku, this.props.licenseRule);
  }  
}

export default hot(module)(BCPriceItem);