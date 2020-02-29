import React, { Component } from "react";

class OtherCommentOptions extends Component {
  state = {};
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="commentOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-times mr-2"></i>Hide Comment
        </span>
      </div>
    );
  }
}

export default OtherCommentOptions;
