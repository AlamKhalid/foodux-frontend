import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isUserLoggedIn,
  user,
  component: Component,
  render,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn ? (
          Component ? (
            <Component {...props} user={user} />
          ) : (
            render(props)
          )
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
