import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { ProductList } from '@app/dump/List';
import ProductList, { ProductItem } from '@app/dump/ProductList';
import PriceListWrap from './PriceListWrap';

export default class ProductListWrap extends Component {
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
    // console.log('Wrap', this.props.bcPrice);
    // console.log('PrliceList', this.props.promoItem)
  }

  mapProductToPromotion = product => {
    if (!this.props.promoItem) return null;
    const List = this.props.promoItem
      .filter(promoItem => {
        if (product.sku === promoItem.sku) {
          return true;
        }
        return false;
      })
      .map(ele3 => ele3);
    return List[0];
  };

  getProductList = bcPrice => {
    return bcPrice
      .map(prdObj => {
        const priceObj = this.mapProductToPromotion(prdObj);
        const updatedPriceObj = {
          price: priceObj ? priceObj.price : prdObj.price,
          salePrice: priceObj ? priceObj.sale_price : prdObj.sale_price,
          defaultPrice: prdObj.price,
          defaultSalePrice: prdObj.sale_price,
          isModPrice: !!priceObj
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
          return reg.test(prdObj.sku) && prdObj.updatedPriceObj.isModPrice;
        }
        return reg.test(prdObj.sku);
      });
  };

  render() {
    const { bcPrice } = this.props;

    return (
      <ProductList>
        {this.getProductList(bcPrice).map((prdObj, index) => {
          return (
            <ProductItem
              key={`item-${prdObj.name}`}
              index={index}
              className="product-item"
            >
              <PriceListWrap
                licenseRule={this.props.licenseRule[prdObj.sku]}
                name={prdObj.name}
                sku={prdObj.sku}
                priceProps={prdObj.updatedPriceObj}
              />
            </ProductItem>
          );
        })}
      </ProductList>
    );
  }
}
