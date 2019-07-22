import React, { Component } from 'react';
import { SortableContainer } from 'react-sortable-hoc';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

// const DragHandle = SortableHandle(() => (
//   <span>
//     <FontAwesomeIcon icon={faBars} />
//   </span>
// ));

// const SortableItem = SortableElement(
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
    return (
      <li
        className={
          this.context.active === this.props.item.promotionId
            ? 'queue-promotion-item active'
            : 'queue-promotion-item'
        }
      >
        {/* <DragHandle /> */}
        <button
          className="ctrl-btn"
          data-promotion-id={this.props.item.promotionId}
          onClick={this.loadPromotion}
        >
          <span className="promo-name">{this.props.item.name}</span>
          <span className="promo-period">
            {this.props.item.startDate.split('T')[0]} -{' '}
            {this.props.item.endDate.split('T')[0]}
          </span>
        </button>
        <button
          className="ctrl-btn close-btn"
          data-promotion-id={this.props.item.promotionId}
          id={this.props.item._id}
          onClick={this.removePromotion}
        >
          X
        </button>
      </li>
    );
  }
}
// )

const SortableList = SortableContainer(({ items, isLoading, errorMsg }) => (
  <>
    <div className="queue-promotion">
      {isLoading
        ? '请求信息中......'
        : errorMsg || (
            <ul className="queue-promotion-list">
              {items.order.map((ele, index) => (
                <Item
                  key={`item-${ele}`}
                  index={index}
                  item={items.queue[ele]}
                />
              ))}
            </ul>
          )}
    </div>
  </>
));

export default SortableList;
