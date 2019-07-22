import React, { Component } from 'react';

class AddPriceRule extends Component {
  componentDidMount() {
    // console.log('', this.props.bcPriceList);
  }

  render() {
    return (
      <div className="add-item-price-container">
        <form onSubmit={this.props.addItem}>
          <div className="item-container">
            <label htmlFor="productDetails">Product Name</label>
            <select name="productDetails" id="productDetails">
              {this.props.bcPriceList
                .filter(prdObj => {
                  const reg = /(^L|^B)/i;
                  return reg.test(prdObj.sku);
                })
                .map(ele => {
                  return (
                    <option
                      key={ele.sku}
                      value={`${ele.sku}-${ele.name}-${ele.price}`}
                    >
                      {ele.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="price-container">
            <label htmlFor="salePrice">SalePrice</label>
            <input id="salePrice" name="salePrice" type="text" />
          </div>
          <div className="add-item-container">
            <button>
              <span>+</span>
            </button>
          </div>
        </form>
        <div>{this.errMsg}</div>
      </div>
    );
  }
}

export default AddPriceRule;
