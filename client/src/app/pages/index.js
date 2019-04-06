import React from 'react';

import UnAuthedRoute from '../routes/UnAuthedRoute/Container'
import AuthedRoute from '../routes/AuthedRoute/Container'
import GeneralRoute from '../routes/GeneralRoute/Container';
import { Switch } from 'react-router-dom';
import { getAllPages } from './helper'
import { pagesInfo } from './pagesInfo'

export default () => (
  <Switch>
    {getAllPages(pagesInfo).filter(pageObj => pageObj.component !== undefined).map((pageObj, index) => {
      switch(pageObj.authType){
        case 'authed':
          return (
            <AuthedRoute key={index} path={pageObj.path} component={pageObj.component} />
          )
        case 'unAuthed':
          return (
            <UnAuthedRoute key={index} path={pageObj.path} component={pageObj.component} />
          )
        default:
          return (
            <GeneralRoute key={index} path={pageObj.path} component={pageObj.component} />
          )
      }
    })}
  </Switch>
)

