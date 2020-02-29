import React, { Component } from "react";

class OwnPostOptions extends Component {
  state = {};
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="postOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-pencil mr-2"></i>Edit Post
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item">
          <i className="fa fa-trash mr-2"></i>Delete Post
        </span>
      </div>
    );
  }
}

export default OwnPostOptions;
