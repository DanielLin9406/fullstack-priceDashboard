import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const RouteLayout = ({ predicate, fallbackPath = '/', ...props }) => {
  // console.log('fallbackPath',fallbackPath)
  const predicateresult = predicate()
  console.log(props)
  console.log(predicateresult)
  console.log(fallbackPath)
  // return predicateresult ? <Route {...props} /> : <Route {...props} />
  return predicateresult ? <Route {...props} /> : <Redirect to={fallbackPath} />
}

export default RouteLayout;