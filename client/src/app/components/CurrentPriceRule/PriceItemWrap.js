import React, { Component } from 'react';
import PropTypes from 'prop-types';

import formatNumber from '@app/shared/formatNumber';
import getUpdatedPrice from '@app/shared/getUpdatedPrice';
import testBundle from '@app/shared/testBundle';
import getDefaultPrice from '@app/shared/getDefaultPrice';

export default class PriceItemWrap extends Component {
  state = {
    checked: {},
    decoratorArr: []
  };

  static contextTypes = {
    mapSku2Name: PropTypes.object,
    currentPromotionId: PropTypes.string
  };

  componentDidMount() {
    this.setUpgradeCheckbox(this.props.licenseRule.upgrade);
  }

  componentDidUpdate() {
    // console.log('price', this.props.priceProps);
  }

  calculateTotalDiscount = sku => {
    let decoratorArr = this.state.decoratorArr;
    if (decoratorArr.indexOf(sku) === -1) {
      decoratorArr.push(sku);
    } else {
      decoratorArr = decoratorArr.filter(ele => ele !== sku);
    }
    this.props.renderDiscountPrice(decoratorArr);
    this.setState(() => ({
      decoratorArr
    }));
  };

  onChangeCheckBox = event => {
    const sku = event.currentTarget.dataset.sku;
    this.setState(state => ({
      checked: {
        ...state.checked,
        [sku]: !state.checked[sku]
      }
    }));
    this.calculateTotalDiscount(sku);
  };

  getKeyArr = obj => {
    const skuArr = Object.keys(obj);
    return skuArr;
  };

  setUpgradeCheckbox = () => {
    const obj = {};
    this.getKeyArr(this.props.licenseRule.upgrade).forEach(ele => {
      obj[ele] = false;
    });
    this.setState(() => ({
      checked: obj
    }));
  };

  render() {
    return (
      <>
        {testBundle(this.props.sku)
          ? // Bundle
            this.getKeyArr(this.props.licenseRule.upgrade)
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map(ele => {
                return (
                  <li key={ele} className="price-item">
                    <p className="price-item-user">
                      <span>{this.context.mapSku2Name[ele]}</span>
                    </p>
                    <p className="price-item-checkbox">
                      <input
                        data-sku={ele}
                        onChange={this.onChangeCheckBox}
                        value={this.state.checked[ele]}
                        type="checkbox"
                      />
                    </p>
                    <p />
                  </li>
                );
              })
          : // Regular Product
            this.props.licenseRule.predecessor
              .sort((a, b) => parseInt(a) - parseInt(b))
              .map(ele => {
                const deduct = this.props.license.calculateDeductible([ele]);
                return (
                  <li key={ele} className="price-item">
                    <p className="price-item-user">
                      <span>{this.context.mapSku2Name[ele] || ele}</span>
                    </p>
                    <p
                      className={
                        this.props.priceProps.isModPrice
                          ? 'price-item-sale-price mod-price'
                          : 'price-item-sale-price'
                      }
                    >
                      <span>
                        {getUpdatedPrice(this.props.priceProps, deduct)}
                      </span>
                    </p>
                    <p
                      className={
                        this.props.priceProps.isModPrice
                          ? 'price-item-price mod-price'
                          : 'price-item-price'
                      }
                    >
                      <span>
                        {formatNumber(this.props.priceProps).salePrice}
                      </span>
                    </p>
                    {this.props.priceProps.isModPrice && (
                      <>
                        <p className="price-item-user">
                          <span />
                        </p>
                        <p className="price-item-default-sale-price">
                          <span>
                            def:{' '}
                            {getDefaultPrice(this.props.priceProps, deduct)}
                          </span>
                        </p>
                        <p className="price-item-default-price">
                          <span>
                            def:{' '}
                            {
                              formatNumber(this.props.priceProps)
                                .defaultSalePrice
                            }
                          </span>
                        </p>
                      </>
                    )}
                  </li>
                );
              })}
      </>
    );
  }
}
