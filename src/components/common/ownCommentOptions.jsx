import React, { Component } from "react";

class OwnCommentOptions extends Component {
  state = {};
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="commentOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-pencil mr-2"></i>Edit Comment
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item">
          <i className="fa fa-trash mr-2"></i>Delete Comment
        </span>
      </div>
    );
  }
}

export default OwnCommentOptions;
