import React,
{
  useEffect,
} from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router';
import {
  useObserver,
} from 'mobx-react';
import AuthStore from '../../../stores/Auth';

import AdminLogin from '../login';
import {
  CircularProgress,
  Container,
} from '@material-ui/core';

import AdminEpisodesForm from './episodes/form';
import AdminEpisodesTable from './episodes';

const AdminRoot = () => {
  useEffect(() => {
    AuthStore.syncStatus();
  }, []);
  return useObserver(() =>
    AuthStore.isAuthenticating
      ? (
        <Container
          style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress />
        </Container>
      )
      : (
        AuthStore.isAuthenticated
          ? (
            <Switch>
              <Route
                path="/admin/login"
              >
                <Redirect
                  to="/admin"
                />
              </Route>
            
                <Route
                  path="/admin/episodes/:key"
                >
                  <AdminEpisodesForm />
                </Route>
                <Route
                  exact
                  path="/admin/episodes"
                >
                  <AdminEpisodesTable />
                </Route>
                <Route
                  path="/admin"
                  exact
                >
                  <div>Hello Admin</div>
                </Route>
              
            </Switch>
          )
          : (
            <Switch>
              <Route
                path="/admin/login"
              >
                <AdminLogin />
              </Route>
              <Route>
                <Redirect
                  to="/admin/login"
                />
              </Route>
            </Switch>
          )
      )
  );
}

export default AdminRoot;