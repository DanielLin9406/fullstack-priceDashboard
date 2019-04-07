import React from 'react'
import RouteUnit from '../RouteUnit/Container';
import { pagePaths } from '@app/pages/pagesInfo'

const UnAuthedRoute = ({ path, unauthenticated, ...props }) => {
  return (
    <RouteUnit
      {...props}
      path={path}
      predicate={() => unauthenticated}
      fallbackPath={pagePaths.DASHBOARD}
    />
  )
}

export default UnAuthedRoute;