import { hot } from "react-hot-loader";
import React from "react";
import ReactLoading from 'react-loading';
import "./CurrentPromotion.scss";

const CurrentPromotion = ({ promotion, isLoading, errorMsg }) => (
  <section className="current-promotion">
    {isLoading ? (
      "请求信息中......"
    ) : errorMsg ? (
      errorMsg
    ) : (
      <p>
        <span>{promotion.queue[promotion.onLive].name}</span>
        <span>{promotion.queue[promotion.onLive].startDate}-</span>
        <span>{promotion.queue[promotion.onLive].endDate}</span>
      </p>
    )}  
  </section>
)

export default hot(module)(CurrentPromotion);