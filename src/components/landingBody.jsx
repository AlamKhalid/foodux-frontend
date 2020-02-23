import React, { Component } from "react";
import Login from "./login";
import SignUp from "./signUp";
import About from "./about";

class LandingBody extends Component {
  state = {};
  render() {
    return (
      <div className="container">
        <div className="row my-3">
          <div className="col-6 pr-5">
            <About />
          </div>
          <div className="col-6">
            {this.props.login ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    );
  }
}

export default LandingBody;
