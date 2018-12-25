import { hot } from "react-hot-loader";
import React, { Component } from "react";
import PropTypes from 'prop-types';

import SortableList from './List';

import './QueuePriceRule.scss';

class QueuePriceRule extends Component{
  static childContextTypes = {
    removePromotion: PropTypes.func,
    loadPromotion:  PropTypes.func
  }
  getChildContext() {
    return {
      removePromotion: this.props.removePromotion,
      loadPromotion: this.props.loadPromotion
    }
  }
  onSortEnd = ({ oldIndex, newIndex, collection }, e) => {
    this.props.sortPromotion(oldIndex, newIndex);
  }
  render(){
    return(
      <section className="queue-price-rule">
        <h2>Promotion Schedule Queue</h2>
        <div className="component-group-container">
          <SortableList 
            onSortEnd={this.onSortEnd}
            items={this.props.promotion}
            isLoading={this.props.isLoading}
            errMsg={this.props.errMsg}
          />
        </div>
      </section>
    )
  }
}

export default hot(module)(QueuePriceRule)