import React, { Component } from 'react';
import License from '@app/shared/license';
// import getPermutations from '@app/shared/getPermutations';
import PriceList, { PriceListHeader } from '@app/dump/PriceList';
import PriceItem, { PriceItemText } from '@app/dump/PriceItem';
import formatNumber from '@app/shared/formatNumber';
import getUpdatedPrice from '@app/shared/getUpdatedPrice';
import testBundle from '@app/shared/testBundle';
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

  componentDidUpdate() {
    // console.log('this.props.licenseRule', this.props.licenseRule);
  }

  renderDiscountPrice = decoratorArr => {
    const deduct = this.license.calculateDeductible(decoratorArr);
    this.setState(() => ({
      deduct
    }));
  };

  getDiscountPrice = (priceProps, deduct) => {
    return getUpdatedPrice(priceProps, deduct);
  };

  render() {
    return (
      <>
        <PriceListHeader>{this.props.name}</PriceListHeader>
        <PriceList>
          <PriceItem.Header className="price-item item-title">
            <PriceItemText.Header>User License</PriceItemText.Header>
            <PriceItemText.Header>Sale Price</PriceItemText.Header>
            <PriceItemText.Header>Price</PriceItemText.Header>
          </PriceItem.Header>

          <li className="price-item">
            <p className="price-item-user">
              <span>Guest</span>
            </p>
            <p
              className={
                this.props.priceProps.isModPrice
                  ? 'price-item-sale-price mod-price'
                  : 'price-item-sale-price'
              }
            >
              <span>{formatNumber(this.props.priceProps).salePrice}</span>
            </p>
            <p
              className={
                this.props.priceProps.isModPrice
                  ? 'price-item-price mod-price'
                  : 'price-item-price'
              }
            >
              <span>{formatNumber(this.props.priceProps).price}</span>
            </p>
            {this.props.priceProps.isModPrice && (
              <>
                <p className="price-item-user">
                  <span />
                </p>
                <p className="price-item-default-sale-price">
                  <span>
                    def: {formatNumber(this.props.priceProps).defaultSalePrice}
                  </span>
                </p>
                <p className="price-item-default-price">
                  <span>
                    def: {formatNumber(this.props.priceProps).defaultPrice}
                  </span>
                </p>
              </>
            )}
          </li>

          <PriceItemWrap
            sku={this.props.sku}
            checked={this.state.checked}
            licenseRule={this.props.licenseRule}
            priceProps={this.props.priceProps}
            license={this.license}
            renderDiscountPrice={this.renderDiscountPrice}
          />
        </PriceList>
        {testBundle(this.props.sku) ? (
          <div className="discount-price-con">
            <span className="name">Discount price</span>
            <span className="price">
              {this.getDiscountPrice(
                this.props.priceProps,
                this.state.deduct
              ) || formatNumber(this.props.priceProps).salePrice}
            </span>
          </div>
        ) : (
          ''
        )}
      </>
    );
  }
}
