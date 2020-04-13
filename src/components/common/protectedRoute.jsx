import React, { useState, useEffect } from "react";
import _ from "lodash";
import { Route, Redirect } from "react-router-dom";
import { getUser } from "../../services/userService";

const ProtectedRoute = ({
  isUserLoggedIn,
  user,
  component: Component,
  render,
  ...rest
}) => {
  const [isVerified, setIsVerified] = useState("false");

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(user)) {
        const { data: userObj } = await getUser(user._id);
        setIsVerified(userObj.isVerified);
      }
    }
    getData();
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isUserLoggedIn && isVerified ? (
          Component ? (
            <Component {...props} user={user} />
          ) : (
            render(props)
          )
        ) : isUserLoggedIn && !isVerified ? (
          <Redirect to="/verify" />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default ProtectedRoute;
