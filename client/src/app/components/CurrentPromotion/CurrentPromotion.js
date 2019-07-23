import React, { Component } from 'react';
import Section, { SectionBody, SectionHeader } from '@app/dump/Section';
import Panel from '@app/dump/Panel';
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

  renderPromotion = () => {
    return !this.props.promotion.onLive ? (
      <>There is no promotion on live</>
    ) : (
      <>
        <p>
          <span>
            {this.props.promotion.queue[this.props.promotion.onLive].name}
          </span>
          <span>
            {this.props.promotion.queue[this.props.promotion.onLive].startDate}-
          </span>
          <span>
            {this.props.promotion.queue[this.props.promotion.onLive].endDate}
          </span>
        </p>
        <button
          className="button show-default-promotion-button"
          onClick={this.onChangePromotion}
        >
          Load onLive Promotion Details
        </button>
      </>
    );
  };

  render() {
    const { isLoading, errorMsg } = this.props;
    if (errorMsg) return <div>{errorMsg}</div>;
    return (
      <Section className="current-promotion">
        <SectionHeader>Promotion Schedule on Live</SectionHeader>
        <SectionBody isLoading={isLoading}>
          <Panel>{this.renderPromotion()}</Panel>
        </SectionBody>
      </Section>
    );
  }
}

export default CurrentPromotion;
