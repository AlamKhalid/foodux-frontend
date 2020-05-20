import React, { Component } from "react";
import Spinner from "./common/spinner";

class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    window.location = "/";
  }

  render() {
    return <Spinner />;
  }
}

export default Logout;
