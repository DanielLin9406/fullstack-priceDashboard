import { hot } from "react-hot-loader";
import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';
import getStashPromoId from '../../../shared/getStashPromoId';
import { testExternalLoading, testExternalMsg } from '../../../shared/testExternalFetch';

import ViewPriceRule from "./ViewPriceRule";
import AddPriceRule from "./AddPriceRule";

import './SetPriceRule.scss';

function parseDate(str, format, locale) {
  const parsed = dateFnsParse(str, format, { locale });
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format, locale) {
  return dateFnsFormat(date, format, { locale });
}

class SetPriceRule extends Component{
  constructor(props){
    super(props);
    this.state = {
      order:[],
      queue:{},
      items:[],
      bcPrice:{},
      isLoading:true,
      stashPromotionId: "",
      currentPromotionId: "",
      errMsg_scheduledPrice: "",
      errMsg_licenseRule: "",      
    }
  }

  static getDerivedStateFromProps(props, state) {  
    const propsStashId = getStashPromoId(props);
    if (!testExternalLoading(props)){    
      console.log('propsStashId', propsStashId);
      // Promotion added
      if (state.stashPromotionId !== propsStashId){
        console.log('Promotion added')
        return {
          ...state,
          isLoading: false,
          bcPrice: props.bcPrice,
          order: props.promotion.order,
          items: props.priceSet.items,
          queue: props.promotion.queue,
          currentPromotionId: props.promotion.active,
          stashPromotionId: propsStashId,
          errMsg_scheduledPrice: props.errMsg_scheduledPrice,
          errMsg_licenseRule: props.errMsg_licenseRule,            
        }
      } else if (state.currentPromotionId !== props.promotion.active){
        // Change Promotion
        console.log(state.stashPromotionId)
        console.log(state.currentPromotionId);
        console.log(props.promotion.active);
        console.log(state.editing);
        console.log('Change Promotion')
        // if ((state.stashPromotionId === state.currentPromotionId)) {
        //   return {
        //     ...state,
        //     currentPromotionId: state.stashPromotionId,
        //   }
        // } else {
        //   return {
        //     ...state,
        //     currentPromotionId: props.promotion.active,
        //   }          
        // }
        if ((state.stashPromotionId === state.currentPromotionId) && !state.editing) {
          return {
            ...state,
            currentPromotionId: state.stashPromotionId,
            editing: true,
          }
        } else {
          return {
            ...state,
            currentPromotionId: props.promotion.active,
            editing: false,
          }          
        }
      }
    }
    return null
  }  

  render(){
    const FORMAT = 'YYYY/MM/DD';
    return (
      <section>
        <h2>Set Price Rule</h2>
        {this.state.isLoading ? (
          "请求信息中......"
          ) : this.state.errMsg_scheduledPrice 
          || this.state.errMsg_licenseRule ? (
            <>
              <div>{this.state.errMsg_scheduledPrice}</div>
              <div>{this.state.errMsg_licenseRule}</div>
            </>
          ) : (
            <div className="row-group-container">
              <form action="">
                <div className="row-group-container">
                  <label htmlFor="">Promotion Name</label>
                  <input 
                    onBlur={this.handlePromoName} 
                    onChange={this.onChangePromoName}
                    value={this.state.queue[this.state.currentPromotionId].name}
                    name="promoName" 
                    type="text" 
                  />
                </div>
                <div className="row-group-container">
                  <label htmlFor="">From</label>
                  <DayPickerInput 
                    value={this.state.queue[this.state.currentPromotionId].startDate}
                    onDayChange={this.handleStartDateChange}
                    formatDate={formatDate}
                    format={FORMAT}                    
                    parseDate={parseDate}
                  />
                </div>
                <div className="row-group-container">
                  <label htmlFor="">To</label>
                  <DayPickerInput 
                    value={this.state.queue[this.state.currentPromotionId].endDate}
                    onDayChange={this.handleEndDateChange}
                    formatDate={formatDate}
                    format={FORMAT}                    
                    parseDate={parseDate}                     
                  />
                </div>

                <ViewPriceRule 
                  currentItemPriceList={this.state.items[this.state.currentPromotionId]}
                  rmItem={this.removeProductFromList}
                />
                <button onClick={(event) => this.onLoadPromotion(event)}>Load unsave edit</button>
                <button onClick={(event) => this.handleApplyPromo(event, 'queue')}>Add schedule</button>
                <div>{this.props.postResponse}</div>
                <button onClick={(event) => this.handleApplyPromo(event, 'onLive')}>Apply rule now</button>
              </form>
              <AddPriceRule 
                addItem={this.handleAddItemToList}
                bcPriceList={this.state.bcPrice}
                currentPromotionId={this.state.currentPromotionId}
              />            
            </div>
          )
        }
      </section>
    )
  }
  componentDidMount(){

  }
  componentDidUpdate(){
    // 由state變化觸發請求
    console.log('state', this.state);   
  }  

  onLoadPromotion = (event) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    if (this.state.items[key]){
      this.setState({
        currentPromotionId: key,
        editing: false,
        queue:{
          ...this.state.queue,
          [key]:{
            promotionId: key.toString(),
            name:"",
            startDate: "",
            endDate: "",
            ...this.state.queue[key]
          }
        },
        items:{
          ...this.state.items,
          [key]: this.state.items[key]
        }      
      });    
    } else {
      this.setState({
        currentPromotionId: key,
        editing: false,
        queue:{
          ...this.state.queue,
          [key]:{
            promotionId: key.toString(),
            name:"",
            startDate: "",
            endDate: "",
            ...this.state.queue[key]
          }
        },
        items:{
          ...this.state.items,
          [key]: []
        }      
      });       
    }
  }

  handleApplyPromo = (event, param) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    if (!this.testScheduleComplete(key)) return;
    this.setState({
      order: this.state.order.push(key)
    })
    this.props.applyPromotion({
      order: this.state.order, 
      queue: this.state.queue,
      items: this.state.items,
      stashPromotionId: this.state.stashPromotionId,
      param: param
    }
    );
  }

  testScheduleComplete = (key) => {
    // queue and item has stashPromotionId => starting edit
    if (this.state.items.hasOwnProperty(key) && this.state.queue.hasOwnProperty(key)){
      return true;
    }
    return false;
  }

  testProductInItem = (key, sku) => {
    if (!this.state.items[key]) return;
    return this.state.items[key].every((item)=>{
      if (item.sku === sku){
        return false
      } else {
        return true
      }
    })
  }

  addProductIntoList = (event) => {
    const key = this.state.stashPromotionId;
    const data = new FormData(event.currentTarget);
    const items = this.state.items[key];
    const [sku, name, price] = data.get('productDetails').split('-');   
    if (!this.testProductInItem(key, sku)) return;
    items.push({
      name: name,
      salePrice: data.get('salePrice'),
      promotionId: key.toString(),
      price: `$${price}`,
      sku: sku
    })
    this.setState({
      items:{
        ...this.state.items,
        [key]: items
      }
    })    
  }

  removeProductFromList = (event) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    const itemIndex = event.currentTarget.dataset.index;
    this.setState({
      items:{
        ...this.state.items,
        [key]: this.state.items[key].filter((ele, i) => i.toString() !== itemIndex)
      }
    })
  }

  handleAddItemToList = (event) => {
    event.preventDefault();
    this.addProductIntoList(event)
    const key = this.state.stashPromotionId;
    this.setState({
      currentPromotionId: key,
      editing: false,
      queue:{
        ...this.state.queue,
        [key]:{
          promotionId: key.toString(),
          name:"",
          startDate: "",
          endDate: "",
          ...this.state.queue[key]
        }
      }     
    });     
  }

  onChangePromoName = (event) => {
    event.preventDefault();
    const key = this.state.currentPromotionId;
    this.setState({
      editing: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          name: event.target.value
        }
      }
    });
  }

  handlePromoName = (event) => {
    const key = this.state.stashPromotionId;
    this.setState({   
      editing: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          promotionId: key.toString(),
          name:event.currentTarget.value
        }
      },
      items:{
        ...this.state.items,
        [key]:[]
      }
    })
  }

  handleStartDateChange = (day) => {
    const formatDay = moment(day).format('YYYY/MM/DD')
    const key = this.state.stashPromotionId;
    this.setState({
      editing: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          promotionId: key.toString(),
          startDate: formatDay,
        }
      },
      items:{
        ...this.state.items,
        [key]:[]
      }      
    })
  }
  handleEndDateChange = (day) => {
    const formatDay = moment(day).format('YYYY/MM/DD')
    const key = this.state.stashPromotionId;
    this.setState({
      editing: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          promotionId: key.toString(),
          endDate: formatDay,
        }
      },
      items:{
        ...this.state.items,
        [key]:[]
      }      
    })
  }
}

export default hot(module)(SetPriceRule)