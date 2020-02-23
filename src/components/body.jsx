import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import MidBody from "./midBody";
import RightSidebar from "./rightSidebar";

class Body extends Component {
  state = {};
  render() {
    return (
      <div className="container my-3">
        <div className="row">
          <div className="col-3">
            <LeftSidebar />
          </div>
          <div className="col-6 text-center">
            <MidBody />
          </div>
          <div className="col-3">
            <RightSidebar />
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
