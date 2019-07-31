import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Section, { SectionHeader, SectionBody } from '@app/dump/Section';
import Panel from '@app/dump/Panel';
import { getStashPromoId } from '@app/shared/productHelper';
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
    const list = props.promotion.queue;
    const events = props.promotion.order.map((ele, index) => {
      return {
        ...state,
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
        ...state,
        order: props.promotion.order,
        queue: props.promotion.queue,
        stashPromotionId: propsStashId,
        events
      };
    }
    if (state.stashPromotionId === propsStashId) {
      return {
        ...state,
        events
      };
    }
    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  componentWillUnmount() {}

  onEventChange = event => {
    this.props.loadPromotion(event.promotionId);
  };

  render() {
    const { isLoading, errMsg } = this.props;
    const { events } = this.state;
    return (
      <Section className="calendar-container">
        <SectionHeader>Calendar</SectionHeader>
        <SectionBody isLoading={isLoading} errMsg={errMsg}>
          <Panel>
            <BigCalendar
              localizer={localizer}
              events={events}
              onSelectEvent={this.onEventChange}
              startAccessor="start"
              endAccessor="end"
              views={allViews}
              navigate={navigator}
            />
          </Panel>
        </SectionBody>
      </Section>
    );
  }
}

export default Calendar;
