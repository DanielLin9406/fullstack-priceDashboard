import React from 'react';
import RouteUnit from '../RouteUnit/Container';

const BaseRoute = ({ ...props }) => {
  console.log({ ...props });
  return <RouteUnit {...props} />;
};

export default BaseRoute;
