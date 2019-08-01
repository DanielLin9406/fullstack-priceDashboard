import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PriceItem, { PriceItemText } from '@app/dump/PriceItem';
import formatNumber from '@app/shared/numberHelper';
import {
  getUpdatedPrice,
  getDefaultPrice,
  getSortedItem
} from '@app/shared/productHelper';
import testBundle from '@app/shared/testHelper';
// TODO: Error control!
// State Management:

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

  componentDidUpdate() {}

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

  setUpgradeCheckbox = () => {
    const obj = {};
    getSortedItem(this.props.licenseRule.upgrade).forEach(ele => {
      obj[ele] = false;
    });
    this.setState(() => ({
      checked: obj
    }));
  };

  render() {
    const { sku, priceProps, licenseRule, license } = this.props;
    return (
      <>
        <PriceItem>
          <PriceItemText.User>Guest</PriceItemText.User>
          {(priceProps.isModPrice && (
            <>
              <PriceItemText.PromoPrice>
                {formatNumber(priceProps).salePrice}
              </PriceItemText.PromoPrice>
              <PriceItemText.PromoPrice>
                {formatNumber(priceProps).price}
              </PriceItemText.PromoPrice>
              <>
                <PriceItemText.User></PriceItemText.User>
                <PriceItemText.DefaultPrice>
                  def: {formatNumber(priceProps).defaultSalePrice}
                </PriceItemText.DefaultPrice>
                <PriceItemText.DefaultPrice>
                  def: {formatNumber(priceProps).defaultPrice}
                </PriceItemText.DefaultPrice>
              </>
            </>
          )) || (
            <>
              <PriceItemText.SalePrice>
                {formatNumber(priceProps).salePrice}
              </PriceItemText.SalePrice>
              <PriceItemText.SalePrice>
                {formatNumber(priceProps).price}
              </PriceItemText.SalePrice>
            </>
          )}
        </PriceItem>
        {testBundle(sku) // Bundle
          ? getSortedItem(licenseRule.upgrade).map(ele => {
              if (ele === undefined) return;
              return (
                <PriceItem key={ele}>
                  <PriceItemText.User>
                    {this.context.mapSku2Name[ele]}
                  </PriceItemText.User>
                  <PriceItemText.Checkbox
                    data-sku={ele}
                    onChange={this.onChangeCheckBox}
                    value={this.state.checked[ele]}
                    type="checkbox"
                    className="price-item-checkbox"
                  />
                </PriceItem>
              );
            })
          : // Regular Product
            getSortedItem(licenseRule.predecessor).map(ele => {
              if (ele === undefined) return;
              const deduct = license.calculateDeductible([ele]);
              return (
                <PriceItem key={ele}>
                  <PriceItemText.User>
                    {this.context.mapSku2Name[ele] || ele}
                  </PriceItemText.User>
                  {(priceProps.isModPrice && (
                    <>
                      <PriceItemText.PromoPrice>
                        {getUpdatedPrice(priceProps, deduct)}
                      </PriceItemText.PromoPrice>
                      <PriceItemText.PromoPrice>
                        {formatNumber(priceProps).salePrice}
                      </PriceItemText.PromoPrice>
                      <>
                        <PriceItemText.User></PriceItemText.User>
                        <PriceItemText.DefaultPrice>
                          def:
                          {getDefaultPrice(priceProps, deduct)}
                        </PriceItemText.DefaultPrice>
                        <PriceItemText.DefaultPrice>
                          def:
                          {formatNumber(priceProps).defaultSalePrice}
                        </PriceItemText.DefaultPrice>
                      </>
                    </>
                  )) || (
                    <>
                      <PriceItemText.SalePrice>
                        {getUpdatedPrice(priceProps, deduct)}
                      </PriceItemText.SalePrice>
                      <PriceItemText.SalePrice>
                        {formatNumber(priceProps).salePrice}
                      </PriceItemText.SalePrice>
                    </>
                  )}
                </PriceItem>
              );
            })}
      </>
    );
  }
}
