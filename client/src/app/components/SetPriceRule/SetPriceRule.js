import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { DateUtils } from 'react-day-picker';
import dateFnsFormat from 'date-fns/format';
import dateFnsParse from 'date-fns/parse';
import moment from 'moment';
import Section, { SectionBody, SectionHeader } from '@app/dump/Section';
import getStashPromoId from '@app/shared/getStashPromoId';
import { testExternalLoading } from '@app/shared/testExternalFetch';

// import Loading from '@app/components/Loading/Loading';
import ViewPriceRule from './ViewPriceRule';
import AddPriceRule from './AddPriceRule';

import './SetPriceRule.scss';

require('moment-timezone');

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

class SetPriceRule extends Component {
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
      errMsgScheduledPrice: '',
      errMsgLicenseRule: '',
      errMsg_component: ''
    };
  }

  static getDerivedStateFromProps(props, state) {
    const propsStashId = getStashPromoId(props);
    if (!testExternalLoading(props)) {
      // console.log('1: state.stashPromotionId', state.stashPromotionId) //
      // console.log('1: propsStashId', propsStashId); //
      // console.log('2: state.currentPromotionId', state.currentPromotionId); // 上一次狀態
      // console.log('2: props.promotion.active', props.promotion.active); // 這一次狀態
      // console.log('state.editingStash', state.editingStash);
      // Promotion added
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
          errMsgScheduledPrice: props.errMsgScheduledPrice,
          errMsgLicenseRule: props.errMsgLicenseRule
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
    }
    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {
    // 由state變化觸發請求
    // console.log('state', this.state);
    // console.log('props', this.props);
  }

  testScheduleComplete = key => {
    // queue and item has stashPromotionId => starting edit
    if (
      Object.prototype.hasOwnProperty.call(this.state.items.key) &&
      this.state.items[key].length > 0 &&
      this.state.queue[key].startDate !== '' &&
      this.state.queue[key].endDate !== '' &&
      this.state.queue[key].name !== ''
    ) {
      return true;
    }
    return false;
  };

  testProductInItem = (key, sku) => {
    if (!this.state.items[key]) return;
    return this.state.items[key].every(item => {
      if (item.sku === sku) {
        return false;
      }
      return true;
    });
  };

  onLoadPromotion = event => {
    event.preventDefault();
    this.setState(state => ({
      currentPromotionId: state.stashPromotionId,
      editingStash: false
    }));
  };

  addProductIntoList = event => {
    const data = new FormData(event.currentTarget);
    const [sku, name, price] = data.get('productDetails').split('-');
    const key = this.state.currentPromotionId;
    if (!this.testProductInItem(key, sku)) return;

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
    const itemIndex = event.currentTarget.dataset.index;
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
    const key = this.state.stashPromotionId;
    if (!this.testScheduleComplete(key)) return;
    console.log('Apply Promotion');
    this.props.asyncApplyPromotion({
      order: this.state.order,
      queue: this.state.queue,
      items: this.state.items,
      stashPromotionId: this.state.stashPromotionId,
      user: this.props.user,
      param
    });
  };

  handleUpdatePromo = event => {
    event.preventDefault();
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
    this.setState(state => {
      const key = state.currentPromotionId;
      return {
        editingStash: false,
        queue: {
          ...state.queue,
          [key]: {
            ...state.queue[key],
            name: event.currentTarget.value
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

  renderSectionHeader = () =>
    (this.state.editingStash && 'Set New Promotion') ||
    'Edit Existing Promotion';

  render() {
    const {
      isLoading,
      currentPromotionId,
      errMsgScheduledPrice,
      errMsgLicenseRule
    } = this.state;
    if (errMsgScheduledPrice || errMsgLicenseRule) {
      return (
        <div>
          {errMsgLicenseRule}
          {errMsgLicenseRule}
        </div>
      );
    }
    return (
      <Section className="set-price-rule">
        <SectionHeader>{this.renderSectionHeader()}</SectionHeader>
        <SectionBody isLoading={isLoading}>
          <div className="component-group-container">
            {!isLoading && !currentPromotionId && (
              <>No promotion schedule has been selected</>
            )}
            {!isLoading && currentPromotionId && (
              <>
                <div className="row-group-container current-container" />
                <div className="row-group-container form-unit-con">
                  <div className="form-unit promo-name-con">
                    <label htmlFor="htmlForPromoName">Promotion Name</label>
                    <input
                      onBlur={this.handlePromoName}
                      onChange={this.handlePromoName}
                      value={this.state.queue[currentPromotionId].name}
                      name="promoName"
                      type="text"
                      id="htmlForPromoName"
                    />
                  </div>
                  <div className="form-unit from-to-con">
                    <div className="from-con">
                      <label htmlFor="">From</label>
                      <DayPickerInput
                        value={this.state.queue[currentPromotionId].startDate}
                        onDayChange={this.handleStartDateChange}
                        formatDate={formatDate}
                        format="YYYY-MM-DD"
                        parseDate={parseDate}
                      />
                    </div>
                    <div className="dash-con"> - </div>
                    <div className="to-con">
                      <label htmlFor="">To</label>
                      <DayPickerInput
                        value={this.state.queue[currentPromotionId].endDate}
                        onDayChange={this.handleEndDateChange}
                        formatDate={formatDate}
                        format="YYYY-MM-DD"
                        parseDate={parseDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="row-group-container inter-form-unit">
                  <AddPriceRule
                    addItem={this.handleAddItemToList}
                    bcPriceList={this.state.bcPrice}
                    currentPromotionId={currentPromotionId}
                    errMsg={this.state.errMsg_component}
                  />
                  <ViewPriceRule
                    currentItemPriceList={this.state.items[currentPromotionId]}
                    rmItem={this.removeProductFromList}
                  />
                </div>
                <div className="row-group-container apply-schedule-button-container">
                  {(this.state.editingStash && (
                    <>
                      <button
                        className="add-schedule-btn"
                        onClick={event => this.handleApplyPromo(event, 'queue')}
                      >
                        Add schedule to queue
                      </button>
                      {/* <button className="apply-btn-now" onClick={(event) => this.handleApplyPromo(event, 'onLive')}>Apply schedule rule now</button> */}
                    </>
                  )) || (
                    <>
                      <button
                        className="add-schedule-btn"
                        onClick={event => this.handleUpdatePromo(event)}
                      >
                        Update schedule
                      </button>
                    </>
                  )}
                </div>
              </>
            )}

            {!this.state.editingStash && (
              <div className="row-group-container add-edit-new-promotion-container">
                <button
                  className="add-edit-new-promotion"
                  onClick={event => this.onLoadPromotion(event)}
                >
                  Add New Promotion
                </button>
              </div>
            )}
          </div>
        </SectionBody>
      </Section>
    );
  }
}

export default SetPriceRule;
