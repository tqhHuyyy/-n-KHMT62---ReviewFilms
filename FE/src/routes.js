import React from 'react';
import {Redirect, Route, Switch, BrowserRouter} from 'react-router-dom';
import * as Page from './pages';
import ProtectedRoute from './components/ProtectedRoute';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={'/'} component={Page.HomePage} />
      <Route path={'/cinemas'} component={Page.CinemaPage} />
      <Route path={'/find'} component={Page.FilmPage} />
      <Route path={'/film/'} component={Page.DetailFilm} />
      <Route exact path={'/contact/'} component={Page.AboutUsPage} />
      <ProtectedRoute path={'/dashboard/'} component={Page.DashBoardPage} />
      <Route exact path={'/login'} component={Page.LoginPage} />
      <Route exact path={'/404'} component={Page.NotFoundPage} />
      <Redirect to="/404" />
    </Switch>
  </BrowserRouter>
);

export default Routes;
