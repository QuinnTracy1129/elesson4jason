import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import App from './containers/App/App';
import asyncComponent from './helpers/AsyncFunc';


const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      <Component {...props} />}
  // render={props => isLoggedIn
  //   ? <Component {...props} />
  //   : <Redirect to={{ pathname: '/fsfsf', state: { from: props.location }, }} />}
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
  return (
    <ConnectedRouter history={history}>
      <div>
        <Route exact path={'/'} component={asyncComponent(() => import('./views/auth/index'))} />
        <Route exact path={'/404'} component={asyncComponent(() => import('./containers/Page/404'))} />
        <Route exact path={'/500'} component={asyncComponent(() => import('./containers/Page/500'))} />
        <RestrictedRoute path="/jms" component={App} isLoggedIn={isLoggedIn} />
      </div>
    </ConnectedRouter>
  );
};

export default connect(state => ({ isLoggedIn: state.Auth.get('token') !== null, }))(PublicRoutes);
