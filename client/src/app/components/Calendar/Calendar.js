import React, { Component } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";

import getStashPromoId from "../../../shared/getStashPromoId";
import Loading from "../Loading/Loading";
import "./Calendar.scss";

const localizer = BigCalendar.momentLocalizer(moment);

let allViews = Object.keys(BigCalendar.Views)
  .filter(e => {
    if (e === "MONTH") {
      return true;
    } else {
      return false;
    }
  })
  .map(k => BigCalendar.Views[k]);

let navigator = Object.keys(BigCalendar.Navigate).filter(e => {
  if (e === "NEXT" || e === "PREVIOUS") {
    return true;
  } else {
    return false;
  }
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "",
      order: [],
      queue: {},
      events: [],
      date: new Date(),
      stashPromotionId: "",
      selectEvent: ""
    };
  }

  static getDerivedStateFromProps(props, state) {
    const propsStashId = getStashPromoId(props);
    // console.log('state.stashPromotionId', state.stashPromotionId)
    // console.log('propsStashId', propsStashId)
    const list = props.promotion.queue;
    const events = props.promotion.order.map((ele, index) => {
      return {
        id: index,
        promotionId: list[ele].promotionId,
        title: list[ele].name,
        allDay: true,
        start: moment(list[ele].startDate, "YYYY/MM/DD").toDate(),
        end: moment(list[ele].endDate, "YYYY/MM/DD").toDate()
      };
    });
    if (state.stashPromotionId !== propsStashId) {
      return {
        order: props.promotion.order,
        queue: props.promotion.queue,
        stashPromotionId: propsStashId,
        events: events
      };
    } else if (state.stashPromotionId === propsStashId) {
      return {
        events: events
      };
    }
    return null;
  }

  render() {
    return (
      <section className="calendar-container">
        <h2>Calendar</h2>
        {this.props.isLoading ? (
          <Loading />
        ) : this.props.errorMsg ? (
          this.props.errorMsg
        ) : (
          <BigCalendar
            localizer={localizer}
            events={this.state.events}
            onSelectEvent={this.onEventChange}
            startAccessor="start"
            endAccessor="end"
            views={allViews}
            navigate={navigator}
          />
        )}
      </section>
    );
  }

  // getSnapshotBeforeUpdate(props, state){
  //   return null
  // }

  componentDidMount() {
    // 請求異步加載數據+綁定事件監聽
    // console.log('state', this.state);
  }

  componentDidUpdate() {
    // 由state變化觸發請求
    // console.log('state', this.state);
  }

  componentWillUnmount() {}

  onEventChange = (event, e) => {
    this.props.loadPromotion(event.promotionId);
    // this.setState({ selectEvent: event.promotionId })
  };
}

export default Calendar;
