import routes from './routeIndex';

function getAllRoutes(routes = []) {
  const allRoutes = [...routes]
  for (let route of routes) {
    console.log(route);
    if (route.routes) allRoutes.unshift(...getAllRoutes(route.routes))
  }
  return allRoutes
}

export { getAllRoutes }