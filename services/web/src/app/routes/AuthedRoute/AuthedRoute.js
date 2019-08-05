import React from 'react';
import { paths } from '@app/pages';
import RouteUnit from '@app/routes/RouteUnit/Container';

const AuthedRoute = ({ authenticated, ...props }) => {
  return (
    <RouteUnit
      {...props}
      predicate={() => authenticated}
      fallbackPath={paths.LOGIN}
    />
  );
};

export default AuthedRoute;
