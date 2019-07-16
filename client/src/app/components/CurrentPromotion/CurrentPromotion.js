import React, { Component } from 'react';

import Loading from '../Loading/Loading';
import './CurrentPromotion.scss';

class CurrentPromotion extends Component {
  onChangePromotion = () => {
    const onLive = this.props.promotion.onLive;
    this.props.loadPromotion(onLive);
  };

  render() {
    return (
      <section className="current-promotion">
        <h2>Promotion Schedule on Live</h2>
        {this.props.isLoading ? (
          <Loading />
        ) : this.props.errorMsg ? (
          this.props.errorMsg
        ) : !this.props.promotion.onLive ? (
          <div className="component-group-container">
            There is no promotion on live
          </div>
        ) : (
          <div className="component-group-container">
            <p>
              <span>
                {this.props.promotion.queue[this.props.promotion.onLive].name}
              </span>
              <span>
                {
                  this.props.promotion.queue[this.props.promotion.onLive]
                    .startDate
                }
                -
              </span>
              <span>
                {
                  this.props.promotion.queue[this.props.promotion.onLive]
                    .endDate
                }
              </span>
            </p>
            <button
              className="button show-default-promotion-button"
              onClick={this.onChangePromotion}
            >
              Load onLive Promotion Details
            </button>
          </div>
        )}
      </section>
    );
  }

  componentDidUpdate() {
    // console.log(getPermutations([1,2,3,4,5]));
    // console.log('promotion', this.props.promotion);
  }
}

export default CurrentPromotion;
