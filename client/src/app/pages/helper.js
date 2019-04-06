function getAllPages(routes = []) {
  const allRoutes = [...routes]
  for (let route of routes) {
    if (route.routes) allRoutes.unshift(...getAllPages(route.routes))
  }
  return allRoutes
}

export { getAllPages }