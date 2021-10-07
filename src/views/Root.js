import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import HomePage from './HomePage';
import DashboardPage from './DashboardPage';

const Root = () => (
  <BrowserRouter>
    <UserPageTemplate>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
      </Switch>
    </UserPageTemplate>
  </BrowserRouter>
);

export default Root;
