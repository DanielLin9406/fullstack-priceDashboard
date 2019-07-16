import React, { Component } from "react";
import PropTypes from "prop-types";

import ProductItem from "./ProductItem";

class BCPriceList extends Component {
  static childContextTypes = {
    mapSku2Name: PropTypes.object,
    currentPromotionId: PropTypes.string
  };

  getChildContext() {
    return {
      mapSku2Name: this.props.mapSku2Name,
      currentPromotionId: this.props.currentPromotionId
    };
  }

  componentDidMount() {}

  componentDidUpdate() {
    // console.log('BCPriceList', this.props.bcPrice);
    // console.log('PrliceList', this.props.promoItem)
  }
  mapProductToPromotion = product => {
    if (!this.props.promoItem) return null;
    const List = this.props.promoItem
      .filter(promoItem => {
        if (product.sku === promoItem.sku) {
          return true;
        } else {
          return false;
        }
      })
      .map(ele3 => ele3);
    return List[0];
  };

  render() {
    return (
      <>
        <ul className="product-list">
          {this.props.bcPrice
            .map(prdObj => {
              const priceObj = this.mapProductToPromotion(prdObj);
              const updatedPriceObj = {
                price: priceObj ? priceObj.price : prdObj.price,
                salePrice: priceObj ? priceObj.sale_price : prdObj.sale_price,
                defaultPrice: prdObj.price,
                defaultSalePrice: prdObj.sale_price,
                isModPrice: priceObj ? true : false
              };
              return {
                ...prdObj,
                updatedPriceObj,
                order: parseInt(prdObj.sku.replace(/^L/, 1).replace(/^B/, 2))
              };
            })
            .sort((a, b) => a.order - b.order)
            .filter(prdObj => {
              const reg = /(^B|^L)/i;
              if (this.props.currentPromotionId) {
                return (
                  reg.test(prdObj.sku) && prdObj.updatedPriceObj.isModPrice
                );
              } else {
                return reg.test(prdObj.sku);
              }
            })
            .map((prdObj, index) => {
              // L1101
              return (
                <li
                  key={`item-${index}`}
                  index={index}
                  className="product-item"
                >
                  <h3>{prdObj.name}</h3>
                  <ProductItem
                    licenseRule={this.props.licenseRule[prdObj.sku]}
                    sku={prdObj.sku}
                    priceProps={prdObj.updatedPriceObj}
                  />
                </li>
              );
            })}
        </ul>
      </>
    );
  }
}

export default BCPriceList;
