import React, { Component } from "react";

class OthersPostOptions extends Component {
  state = {};
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="postOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-bookmark-o mr-2"></i>Save Post
        </span>
        <span className="dropdown-item">
          <i className="fa fa-eye-slash mr-2"></i>Hide Post
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item">
          <i className="fa fa-ban mr-2"></i>Unfollow User
        </span>
      </div>
    );
  }
}

export default OthersPostOptions;
