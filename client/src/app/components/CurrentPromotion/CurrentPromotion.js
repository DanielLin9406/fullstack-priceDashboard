import React, { Component } from 'react';
import Section, { SectionBody } from '../Section/Section';
import './CurrentPromotion.scss';

class CurrentPromotion extends Component {
  componentDidUpdate() {
    // console.log(getPermutations([1,2,3,4,5]));
    // console.log('promotion', this.props.promotion);
  }

  onChangePromotion = () => {
    const onLive = this.props.promotion.onLive;
    this.props.loadPromotion(onLive);
  };

  render() {
    const { isLoading, errorMsg } = this.props;
    if (errorMsg) return <div>{errorMsg}</div>;
    return (
      <Section className="current-promotion">
        <h2>Promotion Schedule on Live</h2>
        <SectionBody isLoading={isLoading}>
          {!this.props.promotion.onLive ? (
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
        </SectionBody>
      </Section>
    );
  }
}

export default CurrentPromotion;
