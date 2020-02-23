import React, { Component } from "react";

class PostButtons extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex justify-content-around postBtns mb-2">
        <span className="postBtn">
          <i className="fa fa-heart-o mr-3"></i>Like
        </span>
        <span className="postBtn">
          <i className="fa fa-comment-o mr-3"></i>Add on
        </span>
      </div>
    );
  }
}

export default PostButtons;
