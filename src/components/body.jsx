import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import MidBody from "./midBody";
import RightSidebar from "./rightSidebar";

class Body extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid container-lg my-3">
        <div className="row">
          <div className="d-none d-lg-block col-lg-3">
            <LeftSidebar />
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <MidBody user={this.props.user} />
          </div>
          <div className="d-none d-md-block col-md-4 col-lg-3">
            <RightSidebar user={this.props.user} />
          </div>
        </div>
      </div>
    );
  }
}

export default Body;
