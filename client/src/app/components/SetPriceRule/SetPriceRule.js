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
      editingStash: true,
      isLoading: true,
      stashPromotionId: "",
      currentPromotionId: "",
      errMsg_scheduledPrice: "",
      errMsg_licenseRule: "", 
      errMsg_component:""     
    }
  }

  static getDerivedStateFromProps(props, state) {  
    const propsStashId = getStashPromoId(props);
    if (!testExternalLoading(props)){    
      // console.log('propsStashId', propsStashId);
      // Promotion added
      if (state.stashPromotionId !== propsStashId){
        console.log('Promotion added')
        return {
          ...state,
          isLoading: false,
          bcPrice: props.bcPrice,
          order: props.promotion.order,
          items: {
            ...props.priceSet.items,
            [propsStashId]:[]
          },
          queue: {
            ...props.promotion.queue,
            [propsStashId]: {
              promotionId: propsStashId.toString(),
              name:"",
              startDate: "",
              endDate: "",              
            }
          },
          currentPromotionId: propsStashId,
          stashPromotionId: propsStashId,
          errMsg_scheduledPrice: props.errMsg_scheduledPrice,
          errMsg_licenseRule: props.errMsg_licenseRule,            
        }
      } else if (state.currentPromotionId !== props.promotion.active){
        // Change Promotion
        // console.log(state.stashPromotionId)
        // console.log(state.currentPromotionId);
        // console.log(props.promotion.active);
        // console.log(state.editingStash);
        console.log('Change Promotion')
        if ((state.stashPromotionId === state.currentPromotionId) && !state.editingStash) {
          return {
            ...state,
            currentPromotionId: state.stashPromotionId,
            editingStash: true,
          }
        } else {
          return {
            ...state,
            currentPromotionId: props.promotion.active,
            editingStash: false,
          }          
        }
      }
    }
    return null
  }  

  render(){
    return (
      <section className="set-price-rule">
        <h2>Set Price Rule</h2>
        {this.state.isLoading ? (
          "请求信息中......"
          ) : this.state.errMsg_scheduledPrice 
          || this.state.errMsg_licenseRule ? (
            <>
              <div>{this.state.errMsg_scheduledPrice}</div>
              <div>{this.state.errMsg_licenseRule}</div>
            </>
          ) : !this.state.currentPromotionId ? (
            <div className="component-group-container">
              No promotion schedule has been selected
            </div>
          ) : (
            <div className="component-group-container">
              <div className="row-group-container">
                <label htmlFor="">Promotion Name</label>
                <input 
                  onBlur={this.handlePromoName} 
                  onChange={this.handlePromoName}
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
                  format={'YYYY/MM/DD'}                    
                  parseDate={parseDate}
                />
              </div>
              <div className="row-group-container">
                <label htmlFor="">To</label>
                <DayPickerInput 
                  value={this.state.queue[this.state.currentPromotionId].endDate}
                  onDayChange={this.handleEndDateChange}
                  formatDate={formatDate}
                  format={'YYYY/MM/DD'}                    
                  parseDate={parseDate}                     
                />
              </div>
              <ViewPriceRule 
                currentItemPriceList={this.state.items[this.state.currentPromotionId]}
                rmItem={this.removeProductFromList}
              />
              {!this.state.editingStash ? (
                <button onClick={(event) => this.onLoadPromotion(event)}>
                  Add New Promotion
                </button>
              ) : 
                <>
                  <button onClick={(event) => this.handleApplyPromo(event, 'queue')}>Add schedule</button>
                  <button onClick={(event) => this.handleApplyPromo(event, 'onLive')}>Apply rule now</button>
                </>
              }
              <div>{this.props.postResponse}</div>
              <AddPriceRule 
                addItem={this.handleAddItemToList}
                bcPriceList={this.state.bcPrice}
                currentPromotionId={this.state.currentPromotionId}
                errMsg={this.state.errMsg_component}
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

  testScheduleComplete = (key) => {
    // queue and item has stashPromotionId => starting edit
    if (this.state.items.hasOwnProperty(key) && this.state.items[key].length>0){
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

  onLoadPromotion = (event) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    this.setState({
      currentPromotionId: key,
      editingStash: false,     
    });
  }

  addProductIntoList = (event) => {
    const key = this.state.currentPromotionId;
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
    const key = this.state.currentPromotionId;
    const itemIndex = event.currentTarget.dataset.index;
    this.setState({
      items:{
        ...this.state.items,
        [key]: this.state.items[key].filter((ele, i) => i.toString() !== itemIndex)
      }
    })
  }

  handleApplyPromo = (event, param) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    if (!this.testScheduleComplete(key)) return;
    this.setState({
      order: this.state.order.push(key),
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

  handleAddItemToList = (event) => {
    event.preventDefault();
    this.addProductIntoList(event)
    const key = this.state.currentPromotionId;
    this.setState({
      currentPromotionId: key,
      editingStash: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key]
        }
      }     
    });     
  }

  handlePromoName = (event) => {
    event.preventDefault();
    const key = this.state.currentPromotionId;
    this.setState({   
      editingStash: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          name:event.currentTarget.value
        }
      }
    })
  }

  handleStartDateChange = (day) => {
    const formatDay = moment(day).format('YYYY/MM/DD');
    const key = this.state.currentPromotionId;
    this.setState({
      editingStash: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          promotionId: key.toString(),
          startDate: formatDay,
        }
      }    
    })
  }
  handleEndDateChange = (day) => {
    const formatDay = moment(day).format('YYYY/MM/DD')
    const key = this.state.currentPromotionId;
    this.setState({
      editingStash: false,
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          promotionId: key.toString(),
          endDate: formatDay,
        }
      }    
    })
  }
}

export default hot(module)(SetPriceRule)