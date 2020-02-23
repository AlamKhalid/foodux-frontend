import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LandingHeader extends Component {
  render() {
    const loginBtnClass = this.props.loginBtn
      ? "btn bg-light text-dark mr-3"
      : "btn btn-outline-light mr-3";

    const SignUpBtnClass = this.props.loginBtn
      ? "btn btn-outline-light"
      : "btn bg-light text-dark";

    return (
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            FooDux
          </NavLink>
          <div>
            <button className={loginBtnClass} onClick={this.props.onClick}>
              Login
            </button>
            <button className={SignUpBtnClass} onClick={this.props.onClick}>
              Sign Up
            </button>
          </div>
        </div>
      </nav>
    );
  }
}

export default LandingHeader;
