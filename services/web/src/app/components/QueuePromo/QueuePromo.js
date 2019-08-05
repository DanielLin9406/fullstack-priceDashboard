import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { testFetchLoading } from '@app/shared/testFetch';
import Section, { SectionBody, SectionHeader } from '@app/dump/Section';
import Panel from '@app/dump/Panel';
import QueuePromoList from './QueuePromoList';

export default class QueuePromo extends Component {
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
    const { loading, errMsg, promotion } = this.props;
    const isLoading = testFetchLoading(loading);

    return (
      <Section className="queue-price-rule">
        <SectionHeader>Schedule Queue</SectionHeader>
        <SectionBody isLoading={isLoading} errMsg={errMsg}>
          <Panel>
            <QueuePromoList
              onSortEnd={this.onSortEnd}
              useDragHandle
              items={promotion}
            />
          </Panel>
        </SectionBody>
      </Section>
    );
  }
}
