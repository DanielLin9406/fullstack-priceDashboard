import React, { Component } from 'react';
import License from '../../../shared/license';

import getPermutations from '../../../shared/getPermutations';
import formatNumber from '../../../shared/formatNumber';
import getUpdatedPrice from '../../../shared/getUpdatedPrice';
import testBundle from '../../../shared/testBundle';

import DiscountList from './DiscountList';

class PriceItem extends Component {
  constructor(props) {
    super(props);
    this.license = new License(props.licenseRule);
    this.state = {
      checked: [],
      deduct: 0
    };
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
        <ul className="price-list">
          <li className="price-item item-title">
            <p>
              <span>User License</span>
            </p>
            <p>
              <span>Sale Price</span>
            </p>
            <p>
              <span>Price</span>
            </p>
          </li>
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
          <DiscountList
            sku={this.props.sku}
            checked={this.state.checked}
            licenseRule={this.props.licenseRule}
            priceProps={this.props.priceProps}
            license={this.license}
            renderDiscountPrice={this.renderDiscountPrice}
          />
        </ul>
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

  componentDidUpdate() {
    // console.log('this.props.licenseRule', this.props.licenseRule);
  }
}

export default PriceItem;
