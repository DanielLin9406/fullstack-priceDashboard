import React, { Component } from 'react';
import { testFetchLoading } from '@app/shared/testFetch';
import { testScheduleComplete } from '@app/shared/testHelper';
import { transFormToObject } from '@app/shared/typeHelper';
import '@app/components/SetPriceRule/SetPriceRule.scss';

export default class EditPromotion extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

    if (state.currentPromotionId !== props.promotion.active) {
      console.log('Load Existing Promotion Data from Props');
      return {
        ...state,
        isLoading: false,
        bcPrice: props.bcPrice,
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
    return null;
  }

  componentDidMount() {}

  componentDidUpdate() {
    console.log(this.state);
  }

  handleUpdatePromo = ({ event, state }) => {
    event.preventDefault();
    event.persist();
    const { currentPromotionId, queue, items } = state;
    const key = currentPromotionId;
    const testResult = testScheduleComplete({ key, queue, items });
    this.setState({
      testResult: transFormToObject(testResult)
    });
    if (testResult.length > 0) return;
    this.props.asyncEditPromotion({
      queue,
      items,
      currentPromotionId,
      user: this.props.user
    });
  };

  handler = () => {
    return {
      applyPromoCall: this.handleUpdatePromo
    };
  };

  render() {
    return <>{this.props.children(this.state, this.handler())}</>;
  }
}
