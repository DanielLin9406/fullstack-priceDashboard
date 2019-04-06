import Loadable from "../components/Loadable/Loadable";

const pagePaths = {
  INDEX: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
}

const pagesInfo = [
  {
    path: pagePaths.DASHBOARD,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "dashboard" */ "./Dashboard/Container"),
      modules: ["dashboard"]
    }),
    authType: 'authed'
  },
  {
    path: pagePaths.LOGIN,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "login" */ "./Login/Container"),
      modules: ["login"]
    }),
    authType: 'unAuthed'
  },
  {
    path: pagePaths.INDEX,
    component: undefined,
    authType: 'general'
  }
]

export {
  pagePaths,
  pagesInfo
}