import { hot } from "react-hot-loader";
import React, { Component } from "react";

import BCPriceList from './List';

import './CurrentPriceRule.scss';

class CurrentPriceRule extends Component{
  state = {
    licenseRule:{},
    bcPrice:{},
    stashPromotionId:"",
    currentPromotionId: "",
    isLoading:true,
    errMsg_scheduledPrice: "",
    errMsg_licenseRule: "",
  }

  static getDerivedStateFromProps(nextProps, prevState) {  
    const keyArr = nextProps.promotion.order.map((ele) => {
      return Number(ele);
    });
    const propsStashId = (Math.max(...keyArr)+1).toString();
    let isLoading = '';
    if (nextProps.isLoading_scheduledPrice || 
      nextProps.isLoading_currentBCPrice || 
      nextProps.isLoading_licenseRule) {
        isLoading = true;
    }
    if (!isLoading){    
      return {
        ...prevState,
        licenseRule: nextProps.licenseRule,
        bcPrice: nextProps.bcPrice,
        priceList: nextProps.priceSet,
        stashPromotionId: propsStashId,
        isLoading:false,
        currentPromotionId: nextProps.promotion.active,
        errMsg_scheduledPrice: nextProps.errMsg_scheduledPrice,
        errMsg_licenseRule: nextProps.errMsg_licenseRule,        
      }
    }
    return null
  }
  render(){
    return (
      <section className="current-price-rule">
        <h2>Current Price Rule</h2>
        <p>active promotionId: {this.state.currentPromotionId}</p>
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
          ) : (
            <div>
              <BCPriceList 
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
    console.log('state', this.state);
  }  
} 

export default hot(module)(CurrentPriceRule);