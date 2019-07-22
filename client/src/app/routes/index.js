import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UnAuthedRoute from './UnAuthedRoute/Container';
import AuthedRoute from './AuthedRoute/Container';
import BaseRoute from './BaseRoute/Container';
import NotFound from '../pages/404';
import getAllPages from '../pages/helper';
import { pagesInfo } from '../pages';

export default () => (
  <Switch>
    {getAllPages(pagesInfo)
      // .filter(pageObj => pageObj.component !== undefined)
      .map(pageObj => {
        switch (pageObj.authType) {
          case 'authed':
            return <AuthedRoute exact key={pageObj.path} {...pageObj} />;
          case 'unAuthed':
            return <UnAuthedRoute exact key={pageObj.path} {...pageObj} />;
          default:
            return <BaseRoute exact key={pageObj.path} {...pageObj} />;
        }
      })}
    <Route component={NotFound} />
  </Switch>
);
