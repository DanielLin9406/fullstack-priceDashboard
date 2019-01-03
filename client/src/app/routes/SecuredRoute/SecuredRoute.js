import React from 'react'
import paths from '../paths'
import Auth from '../../layout/Auth/Container';

function SecuredRoute({ authenticated, ...props }) {
  console.log(authenticated);
  return (
    <Auth
      {...props}
      predicate={() => authenticated}
      fallbackPath={paths.LOGIN}
    />
  )
}

export default SecuredRoute;