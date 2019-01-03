import { hot } from "react-hot-loader";
import React, { Component } from "react";
import { Redirect, Route, Switch } from 'react-router-dom'
import { getAllRoutes } from '../helper'
import routes from '../routeIndex'

const ConsoleRoute = () => {
  return (
    <Switch>
      {getAllRoutes(routes).map((route, index) => (
        <Route key={index} path={route.path} component={route.component} />
      ))}
      <Redirect to={routes[0].path} />
    </Switch>
  )
}

export default hot(module)(ConsoleRoute);
