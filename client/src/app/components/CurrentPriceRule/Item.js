import { hot } from "react-hot-loader";
import React, { Component } from "react";
import PGLicense from '../../../shared/license';

import getPermutations from '../../../shared/getPermutations';
import formatNumber from '../../../shared/formatNumber';
import getUpdatedPrice from '../../../shared/getUpdatedPrice';
import testBundle from '../../../shared/testBundle';

import DiscountList from "./DiscountList";

class BCPriceItem extends Component{
  constructor(props){
    super(props)
    this.license = new PGLicense(props.licenseRule);
    this.state = {
      checked:[],
      discountPrice:""
    }
  }

  renderDiscountPrice = (decoratorArr) => {
    const deduct = this.license.calculateDeductible(decoratorArr);
    const revisedPrice = getUpdatedPrice(this.props.priceProps, deduct);
    this.setState(() => ({
      discountPrice: revisedPrice
    }))
  }

  render(){
    return(
      <>
        <ul className="price-list">
          <li className="price-item item-title">
            <p><span>User License</span></p>
            <p><span>Sale Price</span></p>
            <p><span>Price</span></p>
          </li>
          <li className="price-item">
            <p className="price-item-user"><span>Guest</span></p>
            <p className="price-item-sale-price"><span>{formatNumber(this.props.priceProps).salePrice}</span></p>
            <p className="price-item-price"><span>{formatNumber(this.props.priceProps).price}</span></p>
          </li>
          <DiscountList
            sku={this.props.sku}
            checked={this.state.checked}
            licenseRule={this.props.licenseRule}
            priceProps={this.props.priceProps}
            license={this.license}
            renderDiscountPrice={this.renderDiscountPrice}
          />
        </ul>
        { testBundle(this.props.sku) ? (
          <div className="discount-price-con">
            <span className="name">
              Discount price
            </span>
            <span className="price">{this.state.discountPrice || formatNumber(this.props.priceProps).salePrice}</span>
          </div>              
          ) : ''
        }
      </>
    )
  }


  componentDidUpdate(){
    // console.log('discountPrice', this.state.discountPrice);
    // console.log('license', this.props.licenseRule);
    // this.getAllPermutations(this.props.licenseRule.upgrade);
    // console.log('BCPriceItem', this.props.sku, this.props.licenseRule);
  }  
}

export default hot(module)(BCPriceItem);