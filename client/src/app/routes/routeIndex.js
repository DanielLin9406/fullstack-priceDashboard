import paths from './paths'

import Loadable from "../components/Loadable/Loadable";

const Dashboard = Loadable({
  loader: () => import(/* webpackChunkName: "dashboard" */ "../pages/Dashboard/Container"),
  modules: ["dashboard"]
})

export default [
  {
    path: paths.DASHBOARD,
    component: Dashboard,
  }
]