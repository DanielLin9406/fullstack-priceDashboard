import React, { Component } from 'react';
import {
  SortableContainer,
  SortableElement
  // SortableHandle
} from 'react-sortable-hoc';
import PropTypes from 'prop-types';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ForkButton, FlatButton } from '@app/dump/Button';
import { PromoNameSpan, PromoPeriodSpan, QueueSpan } from '@app/dump/Span';
import QueueList, { QueueItem } from '@app/dump/QueueList';

// const DragHandle = SortableHandle(() => (
//   <QueueSpan>
//     <FontAwesomeIcon icon={faBars} />
//   </QueueSpan>
// ));

const SortableItem = SortableElement(
  class Item extends Component {
    static contextTypes = {
      removePromotion: PropTypes.func,
      loadPromotion: PropTypes.func,
      active: PropTypes.string,
      user: PropTypes.object
    };

    removePromotion = event => {
      const _id = event.currentTarget.id;
      const promotionId = event.currentTarget.dataset.promotionId;
      const user = this.context.user;
      this.context.removePromotion({ promotionId, _id, user });
    };

    loadPromotion = event => {
      this.context.loadPromotion(event.currentTarget.dataset.promotionId);
    };

    render() {
      const { item } = this.props;
      return (
        <>
          <QueueItem active={this.context.active === item.promotionId}>
            {/* <DragHandle /> */}
            <FlatButton
              data-promotion-id={item.promotionId}
              onClick={this.loadPromotion}
            >
              <PromoNameSpan>{item.name}</PromoNameSpan>
              <PromoPeriodSpan>
                {item.startDate.split('T')[0]} - {item.endDate.split('T')[0]}
              </PromoPeriodSpan>
            </FlatButton>
            <ForkButton
              data-promotion-id={item.promotionId}
              id={item._id}
              onClick={this.removePromotion}
            >
              X
            </ForkButton>
          </QueueItem>
        </>
      );
    }
  }
);

const QueuePromoList = SortableContainer(({ items }) => (
  <QueueList>
    {items.order
      .filter(ele => ele.onLive === 'queue')
      .map((ele, index) => (
        <SortableItem
          key={`item-${ele.promoId}`}
          index={index}
          item={items.queue[ele.promoId]}
        />
      ))}
  </QueueList>
));

export default QueuePromoList;
