import { hot } from "react-hot-loader";
import React, { Component } from "react";
import PGLicense from '../../../shared/license';

import getPermutations from '../../../shared/getPermutations';
import formatNumber from '../../../shared/formatNumber';
import DiscountList from "./DiscountList";

class BCPriceItem extends Component{
  constructor(props){
    super(props)
    this.license = new PGLicense(props.licenseRule);
    this.state = {
      checked:[]
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
            <span>{formatNumber(this.props.priceProps).salePrice}</span>
            <span>{formatNumber(this.props.priceProps).price}</span>
          </li>
          <DiscountList
            sku={this.props.sku}
            checked={this.state.checked}
            licenseRule={this.props.licenseRule}
            priceProps={this.props.priceProps}
            license={this.license}
          />
        </ul>
      </div>
    )
  }


  componentDidUpdate(){
    // console.log('license', this.props.licenseRule);
    // this.getAllPermutations(this.props.licenseRule.upgrade);
    // console.log('BCPriceItem', this.props.sku, this.props.licenseRule);
  }  
}

export default hot(module)(BCPriceItem);