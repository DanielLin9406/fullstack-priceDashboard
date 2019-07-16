import React from 'react';
import RouteUnit from '../RouteUnit/Container';
import { paths } from '@app/pages';

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
