import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        return !rest.auth ? (
          <Component {...props} {...rest} />
        ) : (
          <Redirect
            to={{
              pathname: '/'
            }}
          />
        );
      }}
    />
  );
};

export default PublicRoute;
