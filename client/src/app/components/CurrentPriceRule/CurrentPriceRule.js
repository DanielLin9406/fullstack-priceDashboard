import { hot } from "react-hot-loader";
import React, { Component } from "react";

import BCPriceList from './List';
import { testExternalLoading, testExternalMsg } from '../../../shared/testExternalFetch';
import getStashPromoId from '../../../shared/getStashPromoId';


import './CurrentPriceRule.scss';

class CurrentPriceRule extends Component{
  state = {
    licenseRule:{},
    bcPrice:{},
    stashPromotionId:"",
    currentPromotionId: "",
    isLoading: true,
    isDefaultPrice: true,
    errMsg_scheduledPrice: "",
    errMsg_licenseRule: "",
  }

  static getDerivedStateFromProps(props, state) {  
    if (!testExternalLoading(props)){    
      if (state.isDefaultPrice) {
        // Init and Change active promotion
        return {
          ...state,
          licenseRule: props.licenseRule,
          bcPrice: props.bcPrice,
          priceList: props.priceSet,
          stashPromotionId: getStashPromoId(props),
          isLoading: false,
          isDefaultPrice: true,
          currentPromotionId: props.promotion.active,
          errMsg_scheduledPrice: props.errMsg_scheduledPrice,
          errMsg_licenseRule: props.errMsg_licenseRule,        
        }
      } else if (!state.isDefaultPrice) {
        // Set promotionId to ""
        return {
          ...state,
          isDefaultPrice: true,
          currentPromotionId:""
        }
      }
    }
    return null
  }
  render(){
    return (
      <section className="current-price-rule">
        <h2>Current Price Rule</h2>
        <button onClick={this.loadDefaultPriceList}>Load Default Price List</button>
        {
          this.state.isLoading 
          ? (
            "请求信息中......"
          ) : this.state.errMsg_scheduledPrice 
          || this.state.errMsg_licenseRule ? (
            <>
              <div>{this.state.errMsg_scheduledPrice}</div>
              <div>{this.state.errMsg_licenseRule}</div>
            </>
          // ) : !this.state.currentPromotionId ? (
          //   <div className="component-group-container">
          //     <p>Default BC Price List</p>
          //     <BCPriceList 
          //       bcPrice={this.state.bcPrice}
          //       licenseRule={this.state.licenseRule}
          //     />              
          //   </div>
          ) : (
            <div className="component-group-container">
              <BCPriceList 
                currentPromotionId={this.state.currentPromotionId}
                bcPrice={this.state.bcPrice}
                licenseRule={this.state.licenseRule}
                priceList={this.state.priceList.items[this.state.currentPromotionId]}
              />
            </div>
          )
        }
      </section>      
    )
  }
  componentDidUpdate(){
    // 由state變化觸發請求
    // console.log('state', this.state);
  } 
  loadDefaultPriceList = () => {
    this.setState({
      isDefaultPrice: false,
    })
  }
} 

export default hot(module)(CurrentPriceRule);