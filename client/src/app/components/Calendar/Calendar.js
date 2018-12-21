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
      active: "",
      order: [],
      queue: {},
      events: [],
      date: new Date(),
      stashPromotionId: "",
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const keyArr = nextProps.promotion.order.map((ele) => {
      return Number(ele);
    });
    const propsStashId = (Math.max(...keyArr)+1).toString();
    // console.log(nextProps.promotion.order)
    if (prevState.stashPromotionId !== propsStashId){
      const list = nextProps.promotion.queue;
      const events = nextProps.promotion.order.map((ele, index) => {
        return {
          id: index,
          promotionId: list[ele].promotionId,
          title: list[ele].name,
          allDay: true,
          start: moment(list[ele].startDate, 'YYYY/MM/DD').toDate(),
          end: moment(list[ele].endDate, 'YYYY/MM/DD').toDate(),
        }
      })
      return {
        order: nextProps.promotion.order,
        queue: nextProps.promotion.queue,
        stashPromotionId: propsStashId,
        events: events
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
              events={this.state.events}
              onSelectEvent={this.onEventChange}
              startAccessor="start"
              endAccessor="end"
            />
          )
        }
      </section>
    )
  }

  // getSnapshotBeforeUpdate(nextProps, prevState){
  //   return null
  // }

  componentDidMount(){
    // 請求異步加載數據+綁定事件監聽
    // console.log('state', this.state);   
    
  }
  
  componentDidUpdate(){
    // 由state變化觸發請求
    // console.log('state', this.state);   
  }

  componentWillUnmount(){

  }

  onEventChange = (event, e) => {
    this.props.loadPromotion(event.promotionId);
    this.setState({
      active: event.promotionId
    })
  }
}

export default hot(module)(Calendar);