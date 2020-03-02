import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
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
          <Route
            path="/home"
            render={props => <Home {...props} user={user} />}
          />
          <Route
            path="/foodblog"
            render={props => <FoodBlog {...props} user={user} />}
          />
          <Route
            path="/deals-and-discounts"
            render={props => <DealsAndDiscounts {...props} user={user} />}
          />
          <Route
            path={`/user/${user._id}/`}
            render={props => <Profile {...props} user={user} />}
          />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={LandingPage} />;
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
