import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LandingPage from "./components/landingPage";
import Home from "./components/home";
import FoodBlog from "./components/foodBlog";
import Settings from "./components/settings";
import DealsAndDiscounts from "./components/dealsAndDiscounts";
import Profile from "./components/profile";
import Logout from "./components/logout";
import Verify from "./components/verify";
import VerifyUserRoute from "./components/verifyUserRoute";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./App.css";
import "./AppMediaQueries.css";

class App extends Component {
  state = {
    user: {},
  };

  async componentDidMount() {
    // In case of invalid or no jwt
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtDecode(jwt);
      this.setState({ user });
    } catch (ex) {}
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Switch>
          <ProtectedRoute
            path="/user/:id/settings"
            component={Settings}
            user={user}
          />
          <ProtectedRoute path="/user/:id/" component={Profile} user={user} />
          <ProtectedRoute
            path="/restaurant/:id/"
            component={Profile}
            user={user}
          />
          <ProtectedRoute path="/newsfeed" component={Home} user={user} />
          <ProtectedRoute path="/foodblog" component={FoodBlog} user={user} />
          <ProtectedRoute
            path="/deals-and-discounts"
            component={DealsAndDiscounts}
            user={user}
          />
          <Route path="/:id/verify" component={VerifyUserRoute} />
          <Route path="/verify" render={() => <Verify user={user} />} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact render={() => <LandingPage user={user} />} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
