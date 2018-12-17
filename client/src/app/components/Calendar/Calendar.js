import { hot } from "react-hot-loader";
import React, { Component } from "react";
import BigCalendar from 'react-big-calendar'
import moment from 'moment';

import "./Calendar.scss";

const localizer = BigCalendar.momentLocalizer(moment) 

class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {
      promotion:{
        active: "",
        order: [],
        queue: {}       
      },
      events:[],
      date: new Date(),
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.promotion.order !== nextProps.promotion.order){
      return {
        ...prevState,
        promotion:{
          active: nextProps.promotion.active,
          order: nextProps.promotion.order,
          queue: nextProps.promotion.queue
        },
      }
    }
    return null;
  }

  render(){
    return (
      <section className="calendar-container">
        <h2>Calendar</h2>
        {this.props.isLoading ? (
          "请求信息中......"
          ) : this.props.errorMsg ? ( 
            this.props.errorMsg 
          ) : (
            <BigCalendar 
              localizer={localizer}
              events={this.calendarEvents()}
              onSelectEvent={this.onEventChange}
              startAccessor="start"
              endAccessor="end"
            />
          )
        }
      </section>
    )
  }

  getSnapshotBeforeUpdate(nextProps, prevState){
    return null
  }

  componentDidMount(){
    // 請求異步加載數據+綁定事件監聽
    console.log('state', this.state);   
    
  }
  
  componentDidUpdate(){
    // 由state變化觸發請求
    console.log('state', this.state);   
  }

  componentWillUnmount(){

  }

  calendarEvents = () => {
    const events = this.state.promotion.queue;
    return this.state.promotion.order.map((ele, index) => {
      return {
        id: index,
        promotionId: events[ele].promotionId,
        title: events[ele].name,
        allDay: true,
        start: moment(events[ele].startDate, 'YYYY/MM/DD').toDate(),
        end: moment(events[ele].endDate, 'YYYY/MM/DD').toDate(),
      }
    })
  }

  onEventChange = (event, e) => {
    this.props.loadPromotion(event.promotionId);
    this.setState(prevState => ({
      promotion:{
        active: event.promotionId
      }
    }))
  }
}

export default hot(module)(Calendar);