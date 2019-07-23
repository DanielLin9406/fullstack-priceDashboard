import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Section, { SectionHeader } from '@app/dump/Section';
import SortableList from './QueuePromoList';

import './QueuePromo.scss';

class QueuePromo extends Component {
  static childContextTypes = {
    removePromotion: PropTypes.func,
    loadPromotion: PropTypes.func,
    active: PropTypes.string,
    user: PropTypes.object
  };

  getChildContext() {
    return {
      removePromotion: this.props.asyncRemovePromotion,
      loadPromotion: this.props.loadPromotion,
      active: this.props.promotion.active,
      user: this.props.user
    };
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.sortPromotion(oldIndex, newIndex);
  };

  render() {
    return (
      <Section className="queue-price-rule">
        <SectionHeader>Schedule Queue</SectionHeader>
        <div className="component-group-container">
          <SortableList
            onSortEnd={this.onSortEnd}
            items={this.props.promotion}
            isLoading={this.props.isLoading}
            errMsg={this.props.errMsg}
          />
        </div>
      </Section>
    );
  }
}

export default QueuePromo;
