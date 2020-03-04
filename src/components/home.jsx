import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Newsfeed from "./newsfeed";
import Navbar from "./navbar";
import RightSidebar from "./rightSidebar";

class Home extends Component {
  state = {
    active: 0
  };

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <Navbar user={user} />

        <div className="container-fluid container-lg my-3">
          <div className="row">
            <div className="d-none d-lg-block col-lg-3">
              <LeftSidebar active={this.state.active} />
            </div>
            <div className="col-12 col-md-8 col-lg-6">
              <Newsfeed user={this.props.user} />
            </div>
            <div className="d-none d-md-block col-md-4 col-lg-3">
              <RightSidebar user={this.props.user} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
