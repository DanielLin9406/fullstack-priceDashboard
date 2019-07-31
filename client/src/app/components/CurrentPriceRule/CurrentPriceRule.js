import React, { Component } from 'react';
import Section, {
  SectionBody,
  SectionHeader,
  SectionSubHeader
} from '@app/dump/Section';
import { GreenButton } from '@app/dump/Button';
import Panel from '@app/dump/Panel';
import { testFetchLoading } from '@app/shared/testFetch';
import { getStashPromoId } from '@app/shared/productHelper';
import ProductListWrap from './ProductListWrap';

export default class CurrentPriceRule extends Component {
  state = {
    licenseRule: {},
    bcPrice: [],
    priceList: {},
    stashPromotionId: '',
    currentPromotionId: '',
    isLoading: true,
    isDefaultPrice: true,
    errMsg: []
  };

  static getDerivedStateFromProps(props, state) {
    if (testFetchLoading(props.loading)) return null;

    if (state.isDefaultPrice) {
      if (props.promotion.active) {
        console.log(props.bcPrice);
        return {
          ...state,
          licenseRule: props.licenseRule,
          bcPrice: props.bcPrice,
          priceList: props.priceSet,
          stashPromotionId: getStashPromoId(props),
          isLoading: false,
          isDefaultPrice: true,
          currentPromotionId: props.promotion.active,
          errMsg: props.errMsg
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
          errMsg: props.errMsg,
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

  componentDidMount() {
    this.loadPGLicense();
  }

  componentDidUpdate() {
    // 由state變化觸發請求
    // console.log('state', this.state);
  }

  loadPGLicense = () => {
    this.props.asyncGetLicenseRule({ user: this.props.user });
  };

  loadDefaultPriceList = () => {
    this.setState({
      isDefaultPrice: false
    });
    this.props.loadDefaultPromotion();
  };

  renderSubHeader = ({ currentPromotionId, promotion }) => {
    const queue = promotion.queue;
    const name = queue[currentPromotionId] && queue[currentPromotionId].name;
    return currentPromotionId ? (
      <>
        <>
          Promotion Name:<span>{name}</span>
        </>
        <GreenButton onClick={this.loadDefaultPriceList}>
          Load Default Price List
        </GreenButton>
      </>
    ) : (
      <>Default BC Price List</>
    );
  };

  render() {
    const {
      isLoading,
      errMsg,
      currentPromotionId,
      priceList,
      licenseRule,
      bcPrice
    } = this.state;
    const { promotion } = this.props;
    return (
      <Section className="current-price-rule">
        <SectionHeader>Selected Promotion Price List</SectionHeader>
        <SectionSubHeader>
          {this.renderSubHeader({
            currentPromotionId,
            promotion
          })}
        </SectionSubHeader>
        <SectionBody isLoading={isLoading} errMsg={errMsg}>
          <Panel>
            <ProductListWrap
              currentPromotionId={currentPromotionId}
              bcPrice={bcPrice}
              licenseRule={licenseRule}
              promoItem={priceList}
            />
          </Panel>
        </SectionBody>
      </Section>
    );
  }
}
