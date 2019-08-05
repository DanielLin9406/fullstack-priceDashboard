import React from 'react';
import RouteUnit from '@app/routes/RouteUnit/Container';

const BaseRoute = ({ ...props }) => {
  return <RouteUnit {...props} />;
};

export default BaseRoute;
