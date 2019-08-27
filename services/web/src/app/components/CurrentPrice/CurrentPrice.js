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
import TextList, { TextItem } from '@app/dump/TextList';
import ProductListWrap from './ProductListWrap';

export default class CurrentPrice extends Component {
  state = {
    licenseRule: {},
    priceList: [],
    priceSet: {},
    currentPromotionId: '',
    isLoading: true,
    isDefaultPrice: true,
    errMsg: []
  };

  static getDerivedStateFromProps(props, state) {
    if (testFetchLoading(props.loading)) return null;

    if (state.isDefaultPrice) {
      if (props.promotion.active) {
        // console.log(props.priceList);
        return {
          ...state,
          licenseRule: props.licenseRule,
          priceList: props.priceList,
          priceSet: props.priceSet,
          // stashPromotionId: getStashPromoId(props),
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
          priceList: props.priceList,
          priceSet: props.priceSet,
          // stashPromotionId: getStashPromoId(props),
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

  loadDefaultPriceSet = () => {
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
        <TextList>
          Promotion Name:<TextItem>{name}</TextItem>
        </TextList>
        <GreenButton onClick={this.loadDefaultPriceSet}>
          Load Default Price List
        </GreenButton>
      </>
    ) : (
      <>Default Price List</>
    );
  };

  render() {
    const {
      isLoading,
      errMsg,
      currentPromotionId,
      priceSet,
      licenseRule,
      priceList
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
              priceList={priceList}
              licenseRule={licenseRule}
              promoItem={priceSet}
            />
          </Panel>
        </SectionBody>
      </Section>
    );
  }
}
