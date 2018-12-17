import { hot } from "react-hot-loader";
import React from "react";
import SortableList from './List';

import './QueuePriceRule.scss';

const QueuePriceRule = ({promotion, isLoading, errMsg}) => (
  <section className="queue-price-rule">
    <h2>Promotion Schedule Queue</h2>
    <div>
      <SortableList 
        items={promotion}
        isLoading={isLoading}
        errMsg={errMsg}
      />
    </div>
  </section>
)

export default hot(module)(QueuePriceRule)