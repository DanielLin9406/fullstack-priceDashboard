import React, { Component } from 'react';
import SetList, {
  SetItem,
  SetItemCol,
  SetItemCtrlCol
} from '@app/dump/SetList';
import { ForkButton } from '@app/dump/Button';

export default class ViewPriceRule extends Component {
  componentDidUpdate() {
    // console.log('priceList', this.props.currentItemPriceList)
  }

  render = () => (
    <SetList>
      {this.props.currentItemPriceList &&
        this.props.currentItemPriceList.map((ele, index) => (
          <SetItem key={ele.name}>
            <SetItemCol>{ele.name}</SetItemCol>
            <SetItemCol>${ele.sale_price}</SetItemCol>
            <SetItemCtrlCol>
              <ForkButton data-index={index} onClick={this.props.rmItem}>
                X
              </ForkButton>
            </SetItemCtrlCol>
          </SetItem>
        ))}
    </SetList>
  );
}
