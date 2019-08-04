import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { RedButton } from '@app/dump/Button';
import RowGroup, { ColGroupDate, Col, Row } from '@app/dump/RowCol';
import { testProductInItem } from '@app/shared/testHelper';
import parseDate, { formatDate } from '@app/shared/dateHelper';
import ViewPriceRule from '@app/components/SetPriceRule/ViewPriceRule';
import AddPriceRule from '@app/components/SetPriceRule/AddPriceRule';

require('moment-timezone');

export default class HandlePromotion extends Component {
  constructor(props) {
    super(props);
    this.state = { ...props };
  }
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
        items: {
          ...state.items,
          [key]: state.items[key].filter((ele, i) => i.toString() !== itemIndex)
        }
      };
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

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    const { currentPromotionId } = this.state;
    const { state } = this;
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
              errMsg={
                this.props.testResult.promoName &&
                this.props.testResult.promoName.message
              }
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
                errMsg={
                  this.props.testResult.promoStartDate &&
                  this.props.testResult.promoStartDate.message
                }
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
                errMsg={
                  this.props.testResult.promoEndDate &&
                  this.props.testResult.promoEndDate.message
                }
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
            />
          </Row>
          <Row>
            <Col.ErrMsg>
              {this.props.testResult.promoItem &&
                this.props.testResult.promoItem.message}
            </Col.ErrMsg>
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
              onClick={event =>
                this.props.handleAsyncPromoCall({
                  event,
                  state
                })
              }
            >
              {this.props.buttonName}
            </RedButton>
          </Col>
        </RowGroup>
      </>
    );
  }
}
