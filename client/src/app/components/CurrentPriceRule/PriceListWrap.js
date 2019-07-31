import React, { Component } from 'react';
import License from '@app/shared/licenseClass';
import PriceList, { PriceListHeader, DiscountPrice } from '@app/dump/PriceList';
import PriceItem, { PriceItemText } from '@app/dump/PriceItem';
import formatNumber from '@app/shared/numberHelper';
import { getUpdatedPrice } from '@app/shared/productHelper';
import testBundle from '@app/shared/testHelper';
import PriceItemWrap from './PriceItemWrap';

export default class PriceListWrap extends Component {
  constructor(props) {
    super(props);
    this.license = new License(props.licenseRule);
    this.state = {
      checked: [],
      deduct: 0
    };
  }

  componentDidUpdate() {}

  renderDiscountPrice = decoratorArr => {
    const deduct = this.license.calculateDeductible(decoratorArr);
    this.setState(() => ({
      deduct
    }));
  };

  getDiscountPrice = (priceProps, deduct) => {
    return getUpdatedPrice(priceProps, deduct);
  };

  renderDiscountPruce = (priceProps, deduct) => {
    const DiscountPriceVal = this.getDiscountPrice(priceProps, deduct);
    if (DiscountPriceVal) {
      return DiscountPriceVal;
    }
    return formatNumber(priceProps).salePrice;
  };

  render() {
    return (
      <>
        <PriceListHeader>{this.props.name}</PriceListHeader>
        <PriceList>
          <PriceItem.Header>
            <PriceItemText.Header>User License</PriceItemText.Header>
            <PriceItemText.Header>Sale Price</PriceItemText.Header>
            <PriceItemText.Header>Price</PriceItemText.Header>
          </PriceItem.Header>
          <PriceItemWrap
            sku={this.props.sku}
            checked={this.state.checked}
            licenseRule={this.props.licenseRule}
            priceProps={this.props.priceProps}
            license={this.license}
            renderDiscountPrice={this.renderDiscountPrice}
          />
        </PriceList>
        {testBundle(this.props.sku) && (
          <DiscountPrice>
            {this.getDiscountPrice(this.props.priceProps, this.state.deduct)}
          </DiscountPrice>
        )}
      </>
    );
  }
}
