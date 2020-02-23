import React, { Component } from "react";

class PostOptions extends Component {
  state = {};
  render() {
    return (
      <div>
        <i
          className="fa fa-ellipsis-v text-muted"
          id="postOptions"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></i>
        <div className="dropdown-menu" aria-labelledby="postOptions">
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
      </div>
    );
  }
}

export default PostOptions;
