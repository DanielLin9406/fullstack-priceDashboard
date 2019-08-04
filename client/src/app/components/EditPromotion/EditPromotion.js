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
      buttonName: 'Update schedule'
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (testFetchLoading(props.loading)) return null;

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

  handleUpdatePromo = ({ event, state }) => {
    event.preventDefault();
    event.persist();
    const { currentPromotionId, queue, items, order } = state;
    this.props.asyncEditPromotion({
      order,
      queue,
      items,
      currentPromotionId,
      user: this.props.user,
      param: ''
    });
  };

  handler = () => {
    return {
      handleAsyncPromoCall: this.handleUpdatePromo
    };
  };

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return <>{this.props.children(this.state, this.handler())}</>;
  }
}
