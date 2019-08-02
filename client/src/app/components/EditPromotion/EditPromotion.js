import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import Section, { SectionBody, SectionHeader } from '@app/dump/Section';
import Panel from '@app/dump/Panel';
import { RedButton, GreenButton } from '@app/dump/Button';
import RowGroup, {
  ColGroupDate,
  Col,
  Row,
  RowFloatGroup
} from '@app/dump/RowCol';
import { getStashPromoId } from '@app/shared/productHelper';
import { testFetchLoading } from '@app/shared/testFetch';
import {
  testProductInItem,
  testScheduleComplete
} from '@app/shared/testHelper';
import parseDate, { formatDate } from '@app/shared/dateHelper';
import ViewPriceRule from '@app/components/SetPriceRule/ViewPriceRule';
import AddPriceRule from '@app/components/SetPriceRule/AddPriceRule';

import '@app/components/SetPriceRule/SetPriceRule.scss';

require('moment-timezone');

export default class EditPromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      queue: {},
      items: [],
      bcPrice: {},
      editingStash: true,
      isLoading: true,
      stashPromotionId: '',
      currentPromotionId: '',
      errMsg: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const propsStashId = getStashPromoId(props);

    if (testFetchLoading(props.loading)) return null;

    if (props.removedPromoId) {
      console.log('Remove Promotion');
      delete props.priceSet.items[props.removedPromoId];
      delete props.promotion.queue[props.removedPromoId];
      return {
        ...state,
        stashPromotionId: propsStashId,
        currentPromotionId: props.promotion.active,
        order: props.promotion.order,
        editingStash: false,
        items: {
          ...props.priceSet.items,
          [propsStashId]: []
        },
        queue: {
          ...props.promotion.queue,
          [propsStashId]: {
            promotionId: propsStashId.toString(),
            name: '',
            startDate: '',
            endDate: ''
          }
        }
      };
    }

    if (state.stashPromotionId === propsStashId) {
      if (state.currentPromotionId !== props.promotion.active) {
        if (
          state.stashPromotionId === state.currentPromotionId &&
          !state.editingStash
        ) {
          console.log('Edit Promotion');
          return {
            ...state,
            currentPromotionId: state.stashPromotionId,
            editingStash: true
          };
        }
        if (
          state.stashPromotionId !== state.currentPromotionId ||
          state.editingStash
        ) {
          console.log('Change Promotion');
          return {
            ...state,
            currentPromotionId: props.promotion.active,
            editingStash: false
          };
        }
      }
    }
    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  onLoadPromotion = event => {
    event.preventDefault();
    event.persist();
    this.setState(state => ({
      currentPromotionId: state.stashPromotionId,
      editingStash: false
    }));
  };

  addProductIntoList = event => {
    const unCtrlTarget = event.target;
    const data = new FormData(unCtrlTarget);
    const [sku, name, price] = data.get('productDetails').split('-');
    const key = this.state.currentPromotionId;
    const currentItems = this.state.items[key];
    if (!testProductInItem({ sku, currentItems })) return;

    this.setState(state => {
      const newKey = state.currentPromotionId;
      const items = state.items[newKey];
      items.push({
        name,
        sale_price: data.get('salePrice'),
        promotionId: newKey.toString(),
        price,
        sku
      });
      return {
        items: {
          ...state.items,
          [newKey]: items
        }
      };
    });
  };

  removeProductFromList = event => {
    event.preventDefault();
    const unCtrlCurrentTarget = event.currentTarget;
    const itemIndex = unCtrlCurrentTarget.dataset.index;
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        editingStash: false,
        items: {
          ...state.items,
          [key]: state.items[key].filter((ele, i) => i.toString() !== itemIndex)
        }
      };
    });
  };

  handleApplyPromo = (event, param) => {
    event.preventDefault();
    event.persist();
    const key = this.state.stashPromotionId;
    const queue = this.state.queue;
    const items = this.state.items;
    console.log({ key, queue, items });
    if (!testScheduleComplete({ key, queue, items })) return;
    console.log('Apply Promotion');
    this.props.asyncApplyPromotion({
      order: this.state.order,
      queue: this.state.queue,
      items: this.state.items,
      stashPromotionId: this.state.stashPromotionId,
      user: this.props.user,
      param
    });
    this.setState(state => {
      return {
        ...state,
        isLoading: true
      };
    });
  };

  handleUpdatePromo = event => {
    event.preventDefault();
    event.persist();
    // const key = this.state.currentPromotionId;
    this.props.asyncEditPromotion({
      order: this.state.order,
      queue: this.state.queue,
      items: this.state.items,
      currentPromotionId: this.state.currentPromotionId,
      user: this.props.user
    });
  };

  handleAddItemToList = event => {
    event.preventDefault();
    // event.persist();
    this.addProductIntoList(event);
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        currentPromotionId: key,
        editingStash: false,
        queue: {
          ...state.queue,
          [key]: {
            ...state.queue[key]
          }
        }
      };
    });
  };

  handlePromoName = event => {
    event.preventDefault();
    event.persist();
    const unCtrlCurrentTarget = event.currentTarget;
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        editingStash: false,
        queue: {
          ...state.queue,
          [key]: {
            ...state.queue[key],
            name: unCtrlCurrentTarget.value
          }
        }
      };
    });
  };

  handleStartDateChange = day => {
    const formatDay = moment(day).format('YYYY-MM-DD 00:00');
    const pst = moment.tz(formatDay, 'America/Los_Angeles').format();
    console.log(formatDay);
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        editingStash: false,
        queue: {
          ...state.queue,
          [key]: {
            ...state.queue[key],
            promotionId: key.toString(),
            startDate: pst
          }
        }
      };
    });
  };

  handleEndDateChange = day => {
    const formatDay = moment(day).format('YYYY-MM-DD 00:00');
    const pst = moment.tz(formatDay, 'America/Los_Angeles').format();
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        editingStash: false,
        queue: {
          ...state.queue,
          [key]: {
            ...state.queue[key],
            promotionId: key.toString(),
            endDate: pst
          }
        }
      };
    });
  };

  render() {
    const { isLoading, currentPromotionId, errMsg } = this.state;
    return (
      <>
        <RowGroup>
          <Col>
            <Col.Label htmlFor="htmlForPromoName">Promotion Name</Col.Label>
            <Col.Input
              onBlur={this.handlePromoName}
              onChange={this.handlePromoName}
              value={this.state.queue[currentPromotionId].name}
              name="promoName"
              type="text"
              id="htmlForPromoName"
            />
          </Col>
          <ColGroupDate>
            <Col>
              <Col.Label htmlFor="">From</Col.Label>
              <Col.Input
                value={this.state.queue[currentPromotionId].startDate}
                onDayChange={this.handleStartDateChange}
                formatDate={formatDate}
                format="YYYY-MM-DD"
                parseDate={parseDate}
                component={DayPickerInput}
              />
            </Col>
            {'-'}
            <Col>
              <Col.Label htmlFor="">To</Col.Label>
              <Col.Input
                value={this.state.queue[currentPromotionId].endDate}
                onDayChange={this.handleEndDateChange}
                formatDate={formatDate}
                format="YYYY-MM-DD"
                parseDate={parseDate}
                component={DayPickerInput}
              />
            </Col>
          </ColGroupDate>
        </RowGroup>
        <RowGroup>
          <Row className="add-item-price-container">
            <AddPriceRule
              addItem={this.handleAddItemToList}
              bcPriceList={this.state.bcPrice}
              currentPromotionId={currentPromotionId}
              errMsg={this.state.errMsg}
            />
          </Row>
          <Row className="item-price-list-container">
            <ViewPriceRule
              currentItemPriceList={this.state.items[currentPromotionId]}
              rmItem={this.removeProductFromList}
            />
          </Row>
        </RowGroup>

        <RowGroup>
          <Col>
            <RedButton
              onClick={event => {
                return this.handleUpdatePromo(event, '');
              }}
            >
              Update schedule
            </RedButton>
            {/* <button className="apply-btn-now" onClick={(event) => this.handleApplyPromo(event, 'onLive')}>Apply schedule rule now</button> */}
          </Col>
        </RowGroup>
      </>
    );
  }
}
