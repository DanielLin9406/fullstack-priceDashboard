import React from "react";
import ReactLoading from 'react-loading'

const Loading = () => (
  <div className="loading-container">
    <ReactLoading type="spin" color='#ccc' height={50} width={50} /> 
  </div>
)
export default Loading;
