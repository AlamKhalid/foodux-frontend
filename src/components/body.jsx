import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Newsfeed from "./newsfeed";
import RightSidebar from "./rightSidebar";
import { getCategories } from "./../services/categories";

class Body extends Component {
  state = {
    categories: [],
    active: ""
  };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    const active = categories[0]._id;
    this.setState({ categories, active });
  }

  render() {
    return (
      <div className="container-fluid container-lg my-3">
        <div className="row">
          <div className="d-none d-lg-block col-lg-3">
            <LeftSidebar
              categories={this.state.categories}
              active={this.state.active}
            />
          </div>
          <div className="col-12 col-md-8 col-lg-6">
            <Newsfeed user={this.props.user} />
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
