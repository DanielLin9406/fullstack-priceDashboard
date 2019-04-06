import React from 'react'
import RouteLayout from '../RouteLayout/Container';
import { pagePaths } from '../../pages/pagesInfo'

const UnAuthedRoute = ({ path, unauthenticated, ...props }) => {
  return (
    <RouteLayout
      {...props}
      path={path}
      predicate={() => unauthenticated}
      fallbackPath={pagePaths.DASHBOARD}
    />
  )
}

export default UnAuthedRoute;