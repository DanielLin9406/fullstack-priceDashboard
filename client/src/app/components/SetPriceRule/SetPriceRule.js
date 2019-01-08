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
      // console.log('state.stashPromotionId', state.stashPromotionId)
      // console.log('state.currentPromotionId', state.currentPromotionId);
      // console.log('props.promotion.active', props.promotion.active);
      // console.log('props.promotion', props.promotion);
      // console.log('state.editingStash', state.editingStash); 
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
        if ((state.stashPromotionId === state.currentPromotionId) && !state.editingStash) {
          console.log('Edit Promotion')
          return {
            ...state,
            currentPromotionId: state.stashPromotionId,
            editingStash: true,
          }
        } else {
          console.log('Change Promotion')
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
        {this.state.editingStash ?
         <h2>Set New Promotion</h2> : <h2>Edit Existing Promotion</h2> }
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
              <div className="row-group-container current-container">
              </div>
              <div className="row-group-container form-unit-con">
                <div className="form-unit promo-name-con">
                  <label htmlFor="">Promotion Name</label>
                  <input 
                    onBlur={this.handlePromoName} 
                    onChange={this.handlePromoName}
                    value={this.state.queue[this.state.currentPromotionId].name}
                    name="promoName" 
                    type="text" 
                  />
                </div>
                <div className="form-unit from-to-con">
                  <div className="from-con">
                    <label htmlFor="">From</label>
                    <DayPickerInput 
                      value={this.state.queue[this.state.currentPromotionId].startDate}
                      onDayChange={this.handleStartDateChange}
                      formatDate={formatDate}
                      format={'YYYY-MM-DD'}                    
                      parseDate={parseDate}
                    />
                  </div>
                  <div className="dash-con"> - </div>
                  <div className="to-con">
                    <label htmlFor="">To</label>
                    <DayPickerInput 
                      value={this.state.queue[this.state.currentPromotionId].endDate}
                      onDayChange={this.handleEndDateChange}
                      formatDate={formatDate}
                      format={'YYYY-MM-DD'}                    
                      parseDate={parseDate}                     
                    />
                  </div>
                </div>
              </div>
              <div className="row-group-container inter-form-unit">
                <AddPriceRule 
                  addItem={this.handleAddItemToList}
                  bcPriceList={this.state.bcPrice}
                  currentPromotionId={this.state.currentPromotionId}
                  errMsg={this.state.errMsg_component}
                />                
                <ViewPriceRule 
                  currentItemPriceList={this.state.items[this.state.currentPromotionId]}
                  rmItem={this.removeProductFromList}
                />
              </div>
              <div className="row-group-container apply-schedule-button-container">
                {this.state.editingStash ? (
                  <>
                    <button className="add-schedule-btn" onClick={(event) => this.handleApplyPromo(event, 'queue')}>Add schedule to queue</button>
                    <button className="apply-btn-now" onClick={(event) => this.handleApplyPromo(event, 'onLive')}>Apply schedule rule now</button>
                  </>                  
                ) : ''}
              </div>

              {!this.state.editingStash ? (
                <div className="row-group-container add-edit-new-promotion-container">
                <button className="add-edit-new-promotion" onClick={(event) => this.onLoadPromotion(event)}>
                  Add New Promotion
                </button> 
                </div>   
              ) : (
                ''
              )}              
              {/* <div>{this.props.postResponse}</div> */}
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
    if (this.state.items.hasOwnProperty(key) && 
        this.state.items[key].length>0 && 
        this.state.queue[key].startDate !== '' &&
        this.state.queue[key].endDate !== '' &&
        this.state.queue[key].name !== ''
    ){
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
      sale_price: `$${data.get('salePrice')}`,
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
      editingStash: false,
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
    const formatDay = moment(day).format('YYYY-MM-DD');
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
    const formatDay = moment(day).format('YYYY-MM-DD')
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