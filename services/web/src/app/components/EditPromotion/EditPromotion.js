import React, { Component } from 'react';
import { testFetchLoading } from '@app/shared/testFetch';
import '@app/components/SetPriceRule/SetPriceRule.scss';

export default class EditPromotion extends Component {
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
      buttonName: 'Update schedule',
      testResult: []
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (testFetchLoading(props.loading)) return null;
    console.log('current:', state.currentPromotionId);
    console.log('next', props.promotion.active);
    if (state.currentPromotionId !== props.promotion.active) {
      console.log('Load Existing Promotion Data from Props');
      return {
        ...state,
        isLoading: false,
        bcPrice: props.bcPrice,
        order: props.promotion.order,
        items: {
          ...props.priceSet.items
        },
        queue: {
          ...props.promotion.queue
        },
        currentPromotionId: props.promotion.active,
        errMsg: props.errMsg
      };
    }
    // if (props.removedPromoId) {
    //   console.log('Remove Promotion');
    //   delete props.priceSet.items[props.removedPromoId];
    //   delete props.promotion.queue[props.removedPromoId];
    //   return {
    //     ...state,
    //     stashPromotionId: propsStashId,
    //     currentPromotionId: props.promotion.active,
    //     order: props.promotion.order,
    //     // editingStash: false,
    //     items: {
    //       ...props.priceSet.items,
    //       [propsStashId]: []
    //     },
    //     queue: {
    //       ...props.promotion.queue,
    //       [propsStashId]: {
    //         promotionId: propsStashId.toString(),
    //         name: '',
    //         startDate: '',
    //         endDate: ''
    //       }
    //     }
    //   };
    // }
    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.state);
  }

  handleUpdatePromo = ({ event, state }) => {
    event.preventDefault();
    event.persist();
    const { currentPromotionId, queue, items, order } = state;
    const key = currentPromotionId;
    const testResult = testScheduleComplete({ key, queue, items });
    this.setState({
      testResult: transFormToObject(testResult)
    });
    if (testResult.length > 0) return;
    console.log('test success');
    console.log('edit promo');
    this.props.asyncEditPromotion({
      order,
      queue,
      items,
      currentPromotionId,
      user: this.props.user
    });
  };

  handler = () => {
    return {
      handleAsyncPromoCall: this.handleUpdatePromo
    };
  };

  render() {
    return <>{this.props.children(this.state, this.handler())}</>;
  }
}
