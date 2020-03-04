import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "./../services/categories";

class LeftSidebar extends Component {
  state = { categories: [] };

  async componentDidMount() {
    const { data: categories } = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { categories } = this.state;
    const { active } = this.props;

    return (
      <div className="list-group fixed">
        {categories.map(category => (
          <NavLink
            to={category.to}
            className={
              "list-group-item list-group-item-action" +
              (active !== -1 && category._id === categories[active]._id
                ? " active-side"
                : "")
            }
            key={category._id}
          >
            {category.name}
          </NavLink>
        ))}
      </div>
    );
  }
}

export default LeftSidebar;
