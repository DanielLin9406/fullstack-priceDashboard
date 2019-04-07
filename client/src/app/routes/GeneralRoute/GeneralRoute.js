import React from "react";
import RouteUnit from '../RouteUnit/Container';
import { hot } from "react-hot-loader";

const GeneralRoute = ({ ...props }) => {
  return (
    <RouteUnit
      {...props}
      predicate={() => {return true}}
    />
  )
}

export default hot(module)(GeneralRoute);
