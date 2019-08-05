function getAllPages(routes = []) {
  const allRoutes = [...routes];
  routes.forEach(route => {
    if (route.routes) allRoutes.unshift(...getAllPages(route.routes));
  });
  return allRoutes;
}

export default getAllPages;
