import { hot } from "react-hot-loader";
import React, { Component } from "react";
import formatNumber from '../../../shared/formatNumber';
import getUpdatedPrice from '../../../shared/getUpdatedPrice';
import testBundle from '../../../shared/testBundle';

class DiscountList extends Component {
  state = {
    checked:{},
    decoratorArr:[]
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
        decoratorArr: decoratorArr
      }, ()=> {
        this.props.renderDiscountPrice(this.state.decoratorArr)
      })
    } else {
      this.setState({
        decoratorArr: this.state.decoratorArr.filter((ele) => ele !== sku)
      }, () => {
        this.props.renderDiscountPrice(this.state.decoratorArr)
      })      
    } 
  }

  componentDidUpdate(){
    console.log('discount', this.state);
  }

  componentDidMount(){
    this.initStateObj(this.props.licenseRule.upgrade);
  }

  render(){
    return (
      <>
        {testBundle(this.props.sku) ? (
          // Bundle
          this.getKeyArr(this.props.licenseRule.upgrade).map((ele, index) => {
            return (
              <li key={index} className="price-item">
                <p className="price-item-user"><span>{ele}</span></p>
                <p className="price-item-checkbox">
                  <input 
                    data-sku={ele} 
                    onChange={this.onChangeCheckBox} 
                    value={this.state.checked[ele]}
                    type="checkbox"
                  />
                </p>
                <p></p>
              </li>
            )
          })
        ) : (
          // Regular Product
          this.props.licenseRule.predecessor.map((ele, index) => {
            const deduct = this.props.license.calculateDeductible([ele])
            return (
              <li key={index} className="price-item">
                <p className="price-item-user"><span>{ele}</span></p>
                <p className="price-item-sale-price"><span>{getUpdatedPrice(this.props.priceProps, deduct)}</span></p>
                <p className="price-item-price"><span>{formatNumber(this.props.priceProps).salePrice}</span></p>
              </li>              
            )
          })
        )}
      </>
    )
  }
}

export default hot(module)(DiscountList);