import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
import { RedButton, LightRedButton } from '@app/dump/Button';
import RowGroup, { ColGroupDate, Col, Row, ColInput } from '@app/dump/RowCol';
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

  static getDerivedStateFromProps(props, state) {
    if (state.currentPromotionId !== props.currentPromotionId) {
      return {
        ...props
      };
    }
    return null;
  }

  componentDidUpdate() {}

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
    console.log('here');
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

  render() {
    const {
      state,
      props,
      handlePromoName,
      handleStartDateChange,
      handleEndDateChange,
      handleAddItemToList,
      removeProductFromList
    } = this;
    const { currentPromotionId, queue, bcPrice, items } = state;
    const {
      testResult,
      buttonName,
      buttonName2,
      applyPromoCall,
      applyInstantlyPromoCall
    } = props;

    return (
      <>
        <RowGroup>
          <Col>
            <Col.Label htmlFor="htmlForPromoName">Promotion Name</Col.Label>
            <Col.Input
              errMsg={testResult.promoName && testResult.promoName.message}
            >
              <Col.InputWrap
                onBlur={handlePromoName}
                onChange={handlePromoName}
                value={queue[currentPromotionId].name}
                name="promoName"
                type="text"
                id="htmlForPromoName"
              />
            </Col.Input>
          </Col>
          <ColGroupDate>
            <Col>
              <Col.Label htmlFor="">From</Col.Label>
              <Col.Input
                errMsg={
                  testResult.promoStartDate && testResult.promoStartDate.message
                }
              >
                <DayPickerInput
                  value={queue[currentPromotionId].startDate}
                  onDayChange={handleStartDateChange}
                  formatDate={formatDate}
                  format="YYYY-MM-DD"
                  parseDate={parseDate}
                />
              </Col.Input>
            </Col>
            {'-'}
            <Col>
              <Col.Label htmlFor="">To</Col.Label>
              <Col.Input
                errMsg={
                  testResult.promoEndDate && testResult.promoEndDate.message
                }
              >
                <DayPickerInput
                  value={queue[currentPromotionId].endDate}
                  onDayChange={handleEndDateChange}
                  formatDate={formatDate}
                  format="YYYY-MM-DD"
                  parseDate={parseDate}
                />
              </Col.Input>
            </Col>
          </ColGroupDate>
        </RowGroup>
        <RowGroup>
          <Row className="add-item-price-container">
            <AddPriceRule
              addItem={handleAddItemToList}
              bcPriceList={bcPrice}
              currentPromotionId={currentPromotionId}
            />
          </Row>
          <Row>
            <Col.ErrMsg>
              {testResult.promoItem && testResult.promoItem.message}
            </Col.ErrMsg>
          </Row>
          <Row className="item-price-list-container">
            <ViewPriceRule
              currentItemPriceList={items[currentPromotionId]}
              rmItem={removeProductFromList}
            />
          </Row>
        </RowGroup>
        <RowGroup>
          <Col>
            <RedButton
              onClick={event =>
                applyPromoCall({
                  event,
                  state
                })
              }
            >
              {buttonName}
            </RedButton>
            {applyInstantlyPromoCall && (
              <LightRedButton
                onClick={event =>
                  applyInstantlyPromoCall({
                    event,
                    state
                  })
                }
              >
                {buttonName2}
              </LightRedButton>
            )}
          </Col>
        </RowGroup>
      </>
    );
  }
}
