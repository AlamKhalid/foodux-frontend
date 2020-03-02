import React, { Component } from "react";
import Navbar from "./navbar";
import LeftSidebar from "./leftSidebar";
import { getCategories } from "./../services/categories";

class DealsAndDiscounts extends Component {
  state = { categories: [], active: "" };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    const active = categories[2]._id;
    this.setState({ categories, active });
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
              <h1>This will be featuring deals soon!</h1>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DealsAndDiscounts;
