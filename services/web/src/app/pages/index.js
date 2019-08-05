import Loadable from '@app/dump/Loadable';

const paths = {
  INDEX: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard'
};

const pagesInfo = [
  {
    path: paths.DASHBOARD,
    component: Loadable({
      loader: () =>
        import(/* webpackChunkName: "dashboard" */ './Dashboard/Container'),
      modules: ['dashboard']
    }),
    authType: 'authed'
  },
  {
    path: paths.LOGIN,
    component: Loadable({
      loader: () => import(/* webpackChunkName: "login" */ './Login/Container'),
      modules: ['login']
    }),
    authType: 'unAuthed'
  },
  {
    path: paths.INDEX,
    component: undefined,
    predicate: () => {
      return false;
    },
    fallbackPath: '/dashboard',
    authType: 'general'
  }
];

export { paths, pagesInfo };
