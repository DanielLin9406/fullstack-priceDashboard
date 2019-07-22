import React from 'react';
import { paths } from '@app/pages';
import RouteUnit from '../RouteUnit/Container';

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
