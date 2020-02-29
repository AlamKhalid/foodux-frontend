import React, { Component } from "react";

class LeftSidebar extends Component {
  state = {};
  render() {
    return (
      <div className="list-group fixed">
        <button
          type="button"
          className="list-group-item list-group-item-action active-side"
        >
          Newsfeed
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action bg-light"
        >
          Food Blog
        </button>
        <button
          type="button"
          className="list-group-item list-group-item-action bg-light"
        >
          Deals & Discounts
        </button>
      </div>
    );
  }
}

export default LeftSidebar;
