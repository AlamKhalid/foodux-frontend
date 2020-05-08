import React, { Component } from "react";
import Spinner from "./common/spinner";

class Logout extends Component {
  componentDidMount() {
    localStorage.clear();
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  }

  render() {
    return <Spinner />;
  }
}

export default Logout;
