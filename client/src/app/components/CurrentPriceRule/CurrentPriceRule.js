import { hot } from "react-hot-loader";
import React from "react";


const CurrentPriceRule = ({ priceSet }) => (
  <section className="current-price-rule">
    <h2>Current Price Rule</h2>
    <div>
      {priceSet.active}
    </div>
  </section>
)

export default hot(module)(CurrentPriceRule);