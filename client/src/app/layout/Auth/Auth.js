import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const Auth = ({ predicate, fallbackPath = '/', ...props }) => {
  return predicate() ? <Route {...props} /> : <Redirect to={fallbackPath} />
}

export default Auth;