import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

interface RouteProps {}

const PrivateRoute = ({ component, ...rest }: any) => {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={(props: RouteProps) =>
        auth.token ? React.createElement(component, props) : <Redirect to={{ pathname: `/splash`, state: {} }} />
      }
    />
  );
};

export default PrivateRoute;
