import { hot } from "react-hot-loader";
import React, { Component } from "react";
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';

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
      stashPromotionId: "",
      currentPromotionId: ""
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {  
    const keyArr = nextProps.promotion.order.map((ele) => {
      return Number(ele);
    });
    const propsStashId = (Math.max(...keyArr)+1).toString();
    if (prevState.stashPromotionId !== propsStashId){
      return {
        ...prevState,
        order: nextProps.promotion.order,
        items: nextProps.priceSet.items,
        queue: nextProps.promotion.queue,
        currentPromotionId: nextProps.promotion.active,
        stashPromotionId: propsStashId
      }
    }
    return null
  }  

  render(){
    const FORMAT = 'YYYY/MM/DD';
    return (
      <section>
        <h2>Set Price Rule</h2>
        {this.props.isLoading ? (
          "请求信息中......"
          ) : this.props.errorMsg ? ( 
            this.props.errorMsg 
          ) : (
            <div className="row-group-container">
              <div className="row-group-container">
                <label htmlFor="">Promotion Name</label>
                <input 
                  onBlur={this.handlePromoName} 
                  onChange={this.handleInput}
                  name="promoName" 
                  type="text" 
                />
              </div>
              <div className="row-group-container">
                <label htmlFor="">From</label>
                <DayPickerInput 
                  onDayChange={this.handleStartDateChange}
                  formatDate={formatDate}
                  format={FORMAT}                    
                  parseDate={parseDate}
                  placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                />
              </div>
              <div className="row-group-container">
                <label htmlFor="">To</label>
                <DayPickerInput 
                  onDayChange={this.handleEndDateChange} 
                />
              </div>
              <AddPriceRule 
                addItem={this.handleAddItemToList}
              />
              <ViewPriceRule 
                currentItemPriceList={this.state.items[this.state.stashPromotionId]}
                rmItem={this.removeProductFromList}
              />
              <button onClick={this.onLoad}>Load unsave edit</button>
              <button onClick={this.handleAddPromoInQueue}>Add schedule</button>
              <button onClick={this.handleApplyPromoOnLive}>Apply rule now</button>
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

  handleAddItemToList = (event) => {
    event.preventDefault();
    this.addProductIntoList(event)
  }

  handleLoadLastEdit = () => {

  }

  handleAddPromoInQueue = (event) => {
    event.preventDefault();
    const key = this.state.stashPromotionId;
    if (!this.testScheduleComplete(key)) return;
    this.setState({
      order: this.state.order.push(key)
    })
    this.props.addPromotionInQueue(
      this.state.order, 
      this.state.queue,
      this.state.items,
      this.state.stashPromotionId
    );
  }

  handleApplyPromoOnLive = (event) => {
    this.props.applyPromotionNow

  }

  testScheduleComplete = (key) => {
    // queue and item has stashPromotionId => starting edit
    if (this.state.items.hasOwnProperty(key) && this.state.queue.hasOwnProperty(key)){
      return true;
    }
    return false;
  }

  testProductInItem = (key, sku) => {
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
    const [sku, name] = data.get('productDetails').split('-');   
    if (!this.testProductInItem(key, sku)) return;
    items.push({
      name: name,
      price: data.get('salePrice'),
      promotionId: key.toString(),
      retailPrice: '',
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

  submitSchedule = () => {
    this.setState({
      stashPromotionId: undefined
    })
  }

  handlePromoName = (event) => {
    const key = this.state.stashPromotionId;
    this.setState({
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