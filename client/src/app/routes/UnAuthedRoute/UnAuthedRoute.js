import React from 'react';
import RouteUnit from '../RouteUnit/Container';
import { paths } from '@app/pages';

const UnAuthedRoute = ({ path, unauthenticated, ...props }) => {
  return (
    <RouteUnit
      {...props}
      path={path}
      predicate={() => unauthenticated}
      fallbackPath={paths.DASHBOARD}
    />
  );
};

export default UnAuthedRoute;
