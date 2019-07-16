import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const EnrichRoute = ({ predicate, fallbackPath = '/', ...props }) => {
  console.log(predicate());
  return predicate() ? <Route {...props} /> : <Redirect to={fallbackPath} />;
};

export default EnrichRoute;
