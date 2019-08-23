import React, { Component } from 'react';
import { getStashPromoId } from '@app/shared/productHelper';
import { testFetchLoading } from '@app/shared/testFetch';
import { testScheduleComplete } from '@app/shared/testHelper';
import { transFormToObject } from '@app/shared/typeHelper';
import '@app/components/SetPriceRule/SetPriceRule.scss';

export default class AddPromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      queue: {},
      items: [],
      bcPrice: {},
      isLoading: true,
      currentPromotionId: '',
      errMsg: [],
      buttonName: 'Add schedule to queue',
      testResult: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    const propsStashId = getStashPromoId(props);

    if (testFetchLoading(props.loading)) return null;

    if (state.currentPromotionId !== propsStashId) {
      console.log(
        'Load Existing Promotion Data from Props and Prepare for new promotion'
      );
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
        errMsg: props.errMsg
      };
    }

    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {}

  handleApplyPromo = ({ event, state }) => {
    event.preventDefault();
    // event.persist();
    const { currentPromotionId, queue, items, order } = state;
    const key = currentPromotionId;
    const testResult = testScheduleComplete({ key, queue, items });
    this.setState({
      testResult: transFormToObject(testResult)
    });
    if (testResult.length > 0) return;
    console.log('test success');
    console.log('apply promo');
    this.props.asyncApplyPromotion({
      order,
      queue,
      items,
      currentPromotionId,
      user: this.props.user,
      param: 'queue'
    });
  };

  handler = () => {
    return {
      handleAsyncPromoCall: this.handleApplyPromo
    };
  };

  render() {
    return <>{this.props.children(this.state, this.handler())}</>;
  }
}
