import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";

class DealsAndDiscounts extends Component {
  state = { active: 2 };

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <Navbar user={user} />
        <div className="container my-3">
          <div className="row">
            <div className="col-3">
              <LeftSidebar active={this.state.active} />
            </div>
            <div className="col-9">
              <h1>This will be featuring deals soon!</h1>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DealsAndDiscounts;
