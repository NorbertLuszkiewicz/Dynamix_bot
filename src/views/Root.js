import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import UserPageTemplate from 'templates/UserPageTemplate';
import HomePage from './HomePage';
import DashboardPage from './DashboardPage';
import RiotPage from './RiotPage.js';

const Root = () => (
  <BrowserRouter>
    <UserPageTemplate>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/riot.txt" component={RiotPage} />
      </Switch>
    </UserPageTemplate>
  </BrowserRouter>
);

export default Root;
