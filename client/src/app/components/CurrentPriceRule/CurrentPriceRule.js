import React, { Component } from 'react';
import Section, {
  SectionBody,
  SectionHeader,
  SectionSubHeader
} from '@app/dump/Section';
import { GreenButton } from '@app/dump/Button';
import Panel from '@app/dump/Panel';
import { testExternalLoading } from '@app/shared/testExternalFetch';
import getStashPromoId from '@app/shared/getStashPromoId';
import buildMapSkuToName from '@app/shared/mapSku2Name';
import ProductListWrap from './ProductListWrap';
import './CurrentPriceRule.scss';

export default class CurrentPriceRule extends Component {
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

  renderSubHeader = () => {
    return this.state.currentPromotionId ? (
      <>
        <div className="current">
          Promotion Name:
          <span>
            {this.props.promotion.queue[this.state.currentPromotionId] &&
              this.props.promotion.queue[this.state.currentPromotionId].name}
          </span>
        </div>
        <GreenButton
          className="load-default-btn"
          onClick={this.loadDefaultPriceList}
        >
          Load Default Price List
        </GreenButton>
      </>
    ) : (
      <div className="current">Default BC Price List</div>
    );
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
        <SectionHeader>Selected Promotion Price List</SectionHeader>
        <SectionSubHeader>{this.renderSubHeader()}</SectionSubHeader>
        <SectionBody isLoading={isLoading}>
          <Panel>
            {this.state.isLoading || (
              <ProductListWrap
                currentPromotionId={this.state.currentPromotionId}
                bcPrice={this.state.bcPrice}
                mapSku2Name={buildMapSkuToName(this.state.bcPrice)}
                licenseRule={this.state.licenseRule}
                promoItem={
                  this.state.priceList.items[this.state.currentPromotionId]
                }
              />
            )}
          </Panel>
        </SectionBody>
      </Section>
    );
  }
}
