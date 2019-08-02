import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment';
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
import ViewPriceRule from '@app/components/SetPriceRule/ViewPriceRule';
import AddPriceRule from '@app/components/SetPriceRule/AddPriceRule';
import parseDate, { formatDate } from '@app/shared/dateHelper';

class HandlePriceRule extends Component {
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

    if (state.stashPromotionId !== propsStashId) {
      console.log('Promotion added');
      return {
        ...state,
        isLoading: false,
        bcPrice: props.bcPrice,
        order: props.promotion.order,
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
        },
        currentPromotionId: propsStashId,
        stashPromotionId: propsStashId,
        errMsg: props.errMsg
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

  handleRemoveItemFromList = event => {
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

  handler = () => {
    return {
      handlePromoName: this.handlePromoName
    };
  };

  render() {
    const { currentPromotionId } = this.state;
    return (
      <>
        {(currentPromotionId && (
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
              <Row>
                <AddPriceRule
                  addItem={this.handleAddItemToList}
                  bcPriceList={this.state.bcPrice}
                  currentPromotionId={currentPromotionId}
                  errMsg={this.state.errMsg}
                />
              </Row>
              <Row>
                <ViewPriceRule
                  currentItemPriceList={this.state.items[currentPromotionId]}
                  rmItem={this.handleRemoveItemFromList}
                />
              </Row>
            </RowGroup>

            <RowGroup>
              <Col>
                {(this.state.editingStash && (
                  <RedButton
                    onClick={event => this.handleApplyPromo(event, 'queue')}
                  >
                    Add schedule to queue
                  </RedButton>
                )) || (
                  <RedButton
                    onClick={event => this.handleUpdatePromo(event, '')}
                  >
                    Update schedule
                  </RedButton>
                )}
              </Col>
            </RowGroup>
          </>
        )) || <>No promotion schedule has been selected</>}
      </>
    );
  }
}

export default HandlePriceRule;
