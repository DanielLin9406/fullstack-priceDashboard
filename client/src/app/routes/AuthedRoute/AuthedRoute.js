import React from 'react'
import RouteLayout from '../RouteLayout/Container';
import { pagePaths } from '../../pages/pagesInfo'

const AuthedRoute = ({ authenticated, ...props }) => {
  return (
    <RouteLayout
      {...props}
      predicate={() => authenticated}
      fallbackPath={pagePaths.LOGIN}
    />
  )
}

export default AuthedRoute;