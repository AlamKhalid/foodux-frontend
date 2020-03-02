import React, { Component } from "react";
import Navbar from "./navbar";
import LeftSidebar from "./leftSidebar";
import { getCategories } from "./../services/categories";

class Profile extends Component {
  state = { categories: [], active: "" };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <Navbar user={user} />
        <div className="container my-3">
          <div className="row">
            <div className="col-3">
              <LeftSidebar
                categories={this.state.categories}
                active={this.state.active}
              />
            </div>
            <div className="col-9">
              <h1>This will user's profile!</h1>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
