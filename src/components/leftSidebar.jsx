import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class LeftSidebar extends Component {
  state = {};

  render() {
    const { categories, active } = this.props;

    return (
      <div className="list-group fixed">
        {categories.map(category => (
          <NavLink
            to={category.to}
            className={
              "list-group-item list-group-item-action " +
              (category._id === active && "active-side")
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
