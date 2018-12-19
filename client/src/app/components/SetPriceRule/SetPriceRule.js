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
      startDate: undefined,
      order:[],
      queue:{},
      items:[],
      currentPromotionId: undefined
    } 
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.order !== nextProps.promotion.order){
      return {
        ...prevState,
        order: nextProps.promotion.order,
        items: nextProps.priceSet.items,
        queue: nextProps.promotion.queue
      }
    }
    return null;
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
              <form onSubmit={this.submitSchedule} onBlur={this.addProductIntoList}>
                <label htmlFor="">Promotion Name</label>
                <input onBlur={this.handlePromoName} name="promoName" type="text"/>
                <div>
                  <label htmlFor="">From</label>
                  <DayPickerInput 
                    onDayChange={this.handleStartDateChange}
                    formatDate={formatDate}
                    format={FORMAT}                    
                    parseDate={parseDate}
                    placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                  />
                </div>
                <div>
                  <label htmlFor="">To</label>
                  <DayPickerInput 
                    onDayChange={this.handleEndDateChange} 
                  />
                </div>
                <AddPriceRule 
                  // addItem={this.addProductIntoList}
                />
                <ViewPriceRule 
                  rmItem={this.removeProductFromList}
                />
                <button type="submit" >Add schedule</button>
                <button type="submit">Apply rule now</button>
              </form>
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
  }

  handleSubmit = (event) => {
    event.preventDefault();
    return null;
  }

  addProductIntoList = (event) => {
    const productPrice = this.handleAddItemToList(event);
  }

  removeProductFromList = () => {

  }

  submitSchedule = () => {

  }
  getQueueKey = () => {
    const order = this.state.order.map((ele) => {
      return Number(ele);
    });
    return Math.max(...order);       
  }

  handlePromoName = (event) => {
    const key = this.getQueueKey(); 
    this.setState({
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
    const formatDay = moment(day).format('YYYY/MM/DD')
    const key = this.getQueueKey(); 
    this.setState({
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          startDate: formatDay
        }
      }
    })
  }
  handleEndDateChange = (day) => {
    const formatDay = moment(day).format('YYYY-MM-DD')
    const key = this.getQueueKey(); 
    this.setState({
      queue:{
        ...this.state.queue,
        [key]:{
          ...this.state.queue[key],
          endDate: formatDay
        }
      }
    })
  }
}

export default hot(module)(SetPriceRule)