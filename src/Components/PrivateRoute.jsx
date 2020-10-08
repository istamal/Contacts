import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, store, ...rest
}) => {
  const user = sessionStorage.getItem('user');
  return (
    <Route
      {...rest}
      render={(props) => (user ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      ))}
    />
  );
};

export default PrivateRoute;
