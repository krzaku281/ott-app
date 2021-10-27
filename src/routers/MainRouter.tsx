import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from 'routers/PrivateRoute';

const SplashPage = lazy(() => import('pages/splashPage/SplashPage'));
const HomePage = lazy(() => import('pages/homePage/HomePage'));
const PlayerPage = lazy(() => import('pages/playerPage/PlayerPage'));
const LoginPage = lazy(() => import('pages/loginPage/LoginPage'));

function MainRouter() {
  return (
    <Suspense fallback={<div>Page is loading...</div>}>
      <Switch>
        <Route path="/splash" exact component={SplashPage}></Route>
        <Route path="/login" component={LoginPage}></Route>
        <PrivateRoute path="/player/:mediaId" component={PlayerPage}></PrivateRoute>
        <PrivateRoute path="/" component={HomePage}></PrivateRoute>
      </Switch>
    </Suspense>
  );
}

export default MainRouter;
