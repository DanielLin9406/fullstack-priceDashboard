import React, { Component } from 'react';
import Form, { FormCol, FormCtrlCol } from '@app/dump/Form';
import { CrossRedButton } from '@app/dump/Button';

class AddPriceRule extends Component {
  componentDidMount() {
    // console.log('', this.props.bcPriceList);
  }

  getPriceList = () => {
    return this.props.bcPriceList.filter(prdObj => {
      const reg = /(^L|^B)/i;
      return reg.test(prdObj.sku);
    });
  };

  renderOptionList = () => {
    return this.getPriceList().map(ele => (
      <option key={ele.sku} value={`${ele.sku}-${ele.name}-${ele.price}`}>
        {ele.name}
      </option>
    ));
  };

  render() {
    return (
      <>
        <Form onSubmit={this.props.addItem}>
          <FormCol>
            <FormCol.Label htmlFor="productDetails">Product Name</FormCol.Label>
            <FormCol.Select name="productDetails" id="productDetails">
              {this.renderOptionList}
            </FormCol.Select>
          </FormCol>
          <FormCol>
            <FormCol.Label htmlFor="salePrice">SalePrice</FormCol.Label>
            <FormCol.Input id="salePrice" name="salePrice" />
          </FormCol>
          <FormCtrlCol>
            <CrossRedButton>+</CrossRedButton>
          </FormCtrlCol>
        </Form>
      </>
    );
  }
}

export default AddPriceRule;
