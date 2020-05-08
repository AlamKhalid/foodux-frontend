import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({
  isUserLoggedIn,
  user,
  component: Component,
  render,
  ...rest
}) => {
  const isVerified = localStorage.getItem("isVerified").length > 0;
  const loggedIn = localStorage.getItem("isLoggedIn");
  const detailsFilled = localStorage.getItem("filledDetails").length > 0;

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && isVerified && detailsFilled ? (
          Component ? (
            <Component {...props} user={user} />
          ) : (
            render(props)
          )
        ) : (loggedIn && !isVerified) ||
          (loggedIn && isVerified && !detailsFilled) ? (
          <Redirect to="/verify" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
