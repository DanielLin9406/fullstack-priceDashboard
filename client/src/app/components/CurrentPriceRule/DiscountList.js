import { hot } from "react-hot-loader";
import React, { Component } from "react";
import formatNumber from '../../../shared/formatNumber';
import getUpdatedPrice from '../../../shared/getUpdatedPrice';

class DiscountList extends Component {
  state = {
    checked:{},
    decoratorArr:[]
  }

  testBundle = (sku) => {
    const reg = /^B/;
    if (reg.test(sku)){
      return true;
    }
    return false;
  }

  initStateObj = () => {
    let obj = {}
    this.getKeyArr(this.props.licenseRule.upgrade).forEach((ele) => {
      obj[ele] = false
    })
    this.setState((state)=>({
      checked: obj
    }))
  }

  getKeyArr = (obj) => {
    const skuArr = Object.keys(obj)
    return skuArr;
  }

  onChangeCheckBox = (event) => {
    const sku = event.currentTarget.dataset.sku;
    this.setState((state) => ({
      checked:{
        ...state.checked,
        [sku]: !state.checked[sku]
      }
    }))
    this.calculateTotalDiscount(sku);
  }

  calculateTotalDiscount = (sku) => {
    if (this.state.decoratorArr.indexOf(sku) === -1){
      const decoratorArr = this.state.decoratorArr;
      decoratorArr.push(sku);
      this.setState({
        decoratorArr
      })
    } else {
      this.setState((state) => ({
        decoratorArr: state.decoratorArr.filter((ele) => ele !== sku)
      }))      
    } 
  }

  renderDiscountPrice = (decoratorArr) => {
    const deduct = this.props.license.calculateDeductible(decoratorArr);
    return (
      <li className="price-item">
        <span>
          user's discount price
        </span>
        <span>{getUpdatedPrice(this.props.priceProps, deduct)}</span>
        <span></span>
      </li>              
    )
  }

  componentDidUpdate(){
    // console.log('discount', this.state);
  }

  componentDidMount(){
    this.initStateObj(this.props.licenseRule.upgrade);
  }

  render(){
    return (
      <>
        {this.testBundle(this.props.sku) ? (
          // Bundle
          this.getKeyArr(this.props.licenseRule.upgrade).map((ele, index) => {
            return (
              <li key={index} className="price-item">
                <span>{ele} Owner</span>
                <span>
                  <input 
                    data-sku={ele} 
                    onChange={this.onChangeCheckBox} 
                    value={this.state.checked[ele]}
                    type="checkbox"
                  />
                </span>
                <span></span>
              </li>
            )
          })
        ) : (
          // Regular Product
          this.props.licenseRule.predecessor.map((ele, index) => {
            const deduct = this.props.license.calculateDeductible([ele])
            return (
              <li key={index} className="price-item">
                <span>{ele} User</span>
                <span>{getUpdatedPrice(this.props.priceProps, deduct)}</span>
                <span>{formatNumber(this.props.priceProps).salePrice}</span>
              </li>              
            )
          })
        )}
        
        { this.testBundle(this.props.sku) ? (
          this.renderDiscountPrice(this.state.decoratorArr)) 
          : ''
        }
      </>
    )
  }
}

export default hot(module)(DiscountList);