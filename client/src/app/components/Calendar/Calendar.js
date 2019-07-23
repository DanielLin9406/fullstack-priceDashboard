import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Section, { SectionHeader } from '@app/dump/Section';
import getStashPromoId from '@app/shared/getStashPromoId';
import Loading from '@app/components/Loading/Loading';
import './Calendar.scss';

const localizer = BigCalendar.momentLocalizer(moment);

const allViews = Object.keys(BigCalendar.Views)
  .filter(e => {
    if (e === 'MONTH') {
      return true;
    }
    return false;
  })
  .map(k => BigCalendar.Views[k]);

const navigator = Object.keys(BigCalendar.Navigate).filter(e => {
  if (e === 'NEXT' || e === 'PREVIOUS') {
    return true;
  }
  return false;
});

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // active: '',
      // order: [],
      // queue: {},
      events: [],
      // date: new Date(),
      stashPromotionId: ''
      // selectEvent: ''
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
        start: moment(list[ele].startDate, 'YYYY/MM/DD').toDate(),
        end: moment(list[ele].endDate, 'YYYY/MM/DD').toDate()
      };
    });
    if (state.stashPromotionId !== propsStashId) {
      return {
        order: props.promotion.order,
        queue: props.promotion.queue,
        stashPromotionId: propsStashId,
        events
      };
    }
    if (state.stashPromotionId === propsStashId) {
      return {
        events
      };
    }
    return null;
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

  onEventChange = event => {
    this.props.loadPromotion(event.promotionId);
    // this.setState({ selectEvent: event.promotionId })
  };

  render() {
    const { loading, errorMsg } = this.props;
    if (loading) return <Loading />;
    if (errorMsg) return errorMsg;
    return (
      <Section className="calendar-container">
        <SectionHeader>Calendar</SectionHeader>
        <BigCalendar
          localizer={localizer}
          events={this.state.events}
          onSelectEvent={this.onEventChange}
          startAccessor="start"
          endAccessor="end"
          views={allViews}
          navigate={navigator}
        />
      </Section>
    );
  }
}

export default Calendar;
