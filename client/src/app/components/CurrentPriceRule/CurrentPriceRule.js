import React, { Component } from 'react';
// import Loading from '../Loading/Loading';
import ProductList from './ProductList';
import { testExternalLoading } from '../../../shared/testExternalFetch';
import getStashPromoId from '../../../shared/getStashPromoId';
import buildMapSkuToName from '../../../shared/mapSku2Name';
import Section, { SectionBody } from '../Section/Section';
import './CurrentPriceRule.scss';

class CurrentPriceRule extends Component {
  state = {
    licenseRule: {},
    bcPrice: {},
    stashPromotionId: '',
    currentPromotionId: '',
    isLoading: true,
    isDefaultPrice: true,
    errMsgScheduledPrice: '',
    errMsgLicenseRule: ''
  };

  static getDerivedStateFromProps(props, state) {
    if (!testExternalLoading(props)) {
      // console.log('currentPromotionId', props.promotion.active);
      // console.log('isDefaultPrice', state.isDefaultPrice);
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
            errMsgScheduledPrice: props.errMsgScheduledPrice,
            errMsgLicenseRule: props.errMsgLicenseRule
          };
        }
        if (!props.promotion.active) {
          return {
            ...state,
            licenseRule: props.licenseRule,
            bcPrice: props.bcPrice,
            priceList: props.priceSet,
            stashPromotionId: getStashPromoId(props),
            isLoading: false,
            isDefaultPrice: true,
            errMsgScheduledPrice: props.errMsgScheduledPrice,
            errMsgLicenseRule: props.errMsgLicenseRule,
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

  componentDidUpdate() {
    // 由state變化觸發請求
    // console.log('state', this.state);
  }

  loadDefaultPriceList = () => {
    this.setState({
      isDefaultPrice: false
    });
    this.props.loadDefaultPromotion();
  };

  render() {
    const { isLoading, errMsgScheduledPrice, errMsgLicenseRule } = this.state;
    if (errMsgScheduledPrice || errMsgLicenseRule) {
      return (
        <div>
          {errMsgScheduledPrice}
          {errMsgLicenseRule}
        </div>
      );
    }
    return (
      <Section className="current-price-rule">
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
        {this.state.isLoading || (
          <SectionBody isLoading={isLoading}>
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
          </SectionBody>
        )}
      </Section>
    );
  }
}

export default CurrentPriceRule;
