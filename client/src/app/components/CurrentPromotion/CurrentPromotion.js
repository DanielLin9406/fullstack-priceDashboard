import { hot } from "react-hot-loader";
import React, { Component } from "react";
import ReactLoading from 'react-loading';
import "./CurrentPromotion.scss";

class CurrentPromotion extends Component {
  onChangePromotion = () => {
    const onLive = this.props.promotion.onLive;
    this.props.loadPromotion(onLive);
  }

  render(){
    return(
      <section className="current-promotion">
      {this.props.isLoading ? (
        "请求信息中......"
      ) : this.props.errorMsg ? (
        this.props.errorMsg
      ) : (
        <>
        <p>
          <span>{this.props.promotion.queue[this.props.promotion.onLive].name}</span>
          <span>{this.props.promotion.queue[this.props.promotion.onLive].startDate}-</span>
          <span>{this.props.promotion.queue[this.props.promotion.onLive].endDate}</span>
        </p>
        <button onClick={this.onChangePromotion}>show on live details</button>
        </>
      )}  
    </section>
    )
  }
}

export default hot(module)(CurrentPromotion);