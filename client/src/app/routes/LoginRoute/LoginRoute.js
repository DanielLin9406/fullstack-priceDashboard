import React from 'react'
import paths from '../paths'
import Auth from '../../layout/Auth/Container';

import Loadable from "../../components/Loadable/Loadable";

const LoginPage = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "../../pages/Login/Container"),
  modules: ["login"]
})

const LoginRoute = ({ path, unauthenticated, ...props }) => {
  return (
    <Auth
      {...props}
      predicate={() => unauthenticated}
      path={path}
      component={LoginPage}
      fallbackPath={paths.INDEX}
    />
  )
}

export default LoginRoute;