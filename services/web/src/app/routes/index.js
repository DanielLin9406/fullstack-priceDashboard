import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UnAuthedRoute from '@app/routes/UnAuthedRoute/Container';
import AuthedRoute from '@app/routes/AuthedRoute/Container';
import BaseRoute from '@app/routes/BaseRoute/Container';
import NotFound from '@app/pages/404';
import getAllPages from '@app/pages/helper';
import { pagesInfo } from '@app/pages';

export default () => (
  <Switch>
    {getAllPages(pagesInfo).map(pageObj => {
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
