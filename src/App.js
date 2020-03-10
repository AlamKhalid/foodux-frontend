import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import jwtDecode from "jwt-decode";
import _ from "lodash";
import { ToastContainer } from "react-toastify";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import FoodBlog from "./components/foodBlog";
import DealsAndDiscounts from "./components/dealsAndDiscounts";
import Profile from "./components/profile";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";
import "./AppMediaQueries.css";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    // In case of invalid or no jwt
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;
    const isUserLoggedIn = !_.isEmpty(user);

    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <Route
            path="/home"
            render={props =>
              isUserLoggedIn ? (
                <Home {...props} user={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/foodblog"
            render={props =>
              isUserLoggedIn ? (
                <FoodBlog {...props} user={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path="/deals-and-discounts"
            render={props =>
              isUserLoggedIn ? (
                <DealsAndDiscounts {...props} user={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route
            path={`/user/:id/`}
            render={props =>
              isUserLoggedIn ? (
                <Profile {...props} user={user} />
              ) : (
                <Redirect to="/" />
              )
            }
          />
          <Route path="/logout" component={Logout} />

          <Route
            path="/"
            exact
            render={props =>
              isUserLoggedIn ? (
                <Redirect to="/home" />
              ) : (
                <LandingPage {...props} />
              )
            }
          />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
