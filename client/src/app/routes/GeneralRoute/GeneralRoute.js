import React from "react";
import RouteLayout from '../RouteLayout/Container';
import { hot } from "react-hot-loader";

const GeneralRoute = ({ ...props }) => {
  return (
    <RouteLayout
      {...props}
      predicate={() => {return true}}
    />
  )
}

export default hot(module)(GeneralRoute);
