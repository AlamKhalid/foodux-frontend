import React from "react";
import { NavLink } from "react-router-dom";

const Unverified = () => {
  return (
    <React.Fragment>
      <div className="text-center">
        <i
          style={{ color: "#ffd48b" }}
          className="fa fa-question-circle-o i-lg"
        ></i>
        <h2 className="text-uppercase verify-heading">verify your email</h2>
      </div>
      <br />
      <div className="text-center">
        <h5 className="text-uppercase">a verification email has been sent</h5>
        <p className="text-uppercase">please check you inbox or spam</p>
        <NavLink className="btn foodux-btn" to="/">
          <i className="fa fa-chevron-left mr-3"></i>Home Page
        </NavLink>
      </div>
    </React.Fragment>
  );
};

export default Unverified;
