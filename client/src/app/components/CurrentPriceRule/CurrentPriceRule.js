import React, { Component } from 'react';

import Loading from '../Loading/Loading';
import ProductList from './ProductList';
import { testExternalLoading } from '../../../shared/testExternalFetch';
import getStashPromoId from '../../../shared/getStashPromoId';
import buildMapSkuToName from '../../../shared/mapSku2Name';

import './CurrentPriceRule.scss';

class CurrentPriceRule extends Component {
  state = {
    licenseRule: {},
    bcPrice: {},
    stashPromotionId: '',
    currentPromotionId: '',
    isLoading: true,
    isDefaultPrice: true,
    errMsg_scheduledPrice: '',
    errMsg_licenseRule: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (!testExternalLoading(props)) {
      console.log('currentPromotionId', props.promotion.active);
      console.log('isDefaultPrice', state.isDefaultPrice);
      if (state.isDefaultPrice) {
        if (props.promotion.active) {
          return {
            ...state,
            licenseRule: props.licenseRule,
            bcPrice: props.bcPrice,
            priceList: props.priceSet,
            stashPromotionId: getStashPromoId(props),
            isLoading: false,
            isDefaultPrice: true,
            currentPromotionId: props.promotion.active,
            errMsg_scheduledPrice: props.errMsg_scheduledPrice,
            errMsg_licenseRule: props.errMsg_licenseRule
          };
        } else if (!props.promotion.active) {
          return {
            ...state,
            licenseRule: props.licenseRule,
            bcPrice: props.bcPrice,
            priceList: props.priceSet,
            stashPromotionId: getStashPromoId(props),
            isLoading: false,
            isDefaultPrice: true,
            errMsg_scheduledPrice: props.errMsg_scheduledPrice,
            errMsg_licenseRule: props.errMsg_licenseRule,
            currentPromotionId: ''
          };
        }
      } else if (!state.isDefaultPrice) {
        return {
          ...state,
          isDefaultPrice: true,
          currentPromotionId: ''
        };
      }
    }
    return null;
  }

  render() {
    return (
      <section className="current-price-rule">
        <h2>Selected Promotion Price List</h2>
        <div className="section-state">
          {this.state.currentPromotionId ? (
            <>
              <div className="current">
                Promotion Name:{' '}
                <span>
                  {this.props.promotion.queue[this.state.currentPromotionId] &&
                    this.props.promotion.queue[this.state.currentPromotionId]
                      .name}
                </span>
              </div>
              <button
                className="load-default-btn"
                onClick={this.loadDefaultPriceList}
              >
                Load Default Price List
              </button>
            </>
          ) : (
            <div className="current">Default BC Price List</div>
          )}
        </div>
        {this.state.isLoading ? (
          <Loading />
        ) : this.state.errMsg_scheduledPrice ||
          this.state.errMsg_licenseRule ? (
          <>
            <div>{this.state.errMsg_scheduledPrice}</div>
            <div>{this.state.errMsg_licenseRule}</div>
          </>
        ) : (
          <div className="component-group-container">
            <ProductList
              currentPromotionId={this.state.currentPromotionId}
              bcPrice={this.state.bcPrice}
              mapSku2Name={buildMapSkuToName(this.state.bcPrice)}
              licenseRule={this.state.licenseRule}
              promoItem={
                this.state.priceList.items[this.state.currentPromotionId]
              }
            />
          </div>
        )}
      </section>
    );
  }
  componentDidUpdate() {
    // 由state變化觸發請求
    console.log('state', this.state);
  }
  loadDefaultPriceList = () => {
    this.setState({
      isDefaultPrice: false
    });
    this.props.loadDefaultPromotion();
  };
}

export default CurrentPriceRule;
