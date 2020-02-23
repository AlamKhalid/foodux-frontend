import React, { Component } from "react";

class PostButtons extends Component {
  state = {
    likeBtn: false,
    likeBtnClass: "-o"
  };

  handleClick = () => {
    const likeBtn = !this.state.likeBtn;
    const likeBtnClass = this.state.likeBtn ? " app-color" : "-o";
    this.setState({ likeBtnClass, likeBtn });
  };

  render() {
    return (
      <div className="d-flex justify-content-around postBtns mb-2">
        <span className="postBtn" onClick={this.handleClick}>
          <i className={`fa mr-3 fa-heart${this.state.likeBtnClass}`}></i>Like
        </span>
        <span className="postBtn">
          <i className="fa fa-comment-o mr-3"></i>Add on
        </span>
      </div>
    );
  }
}

export default PostButtons;
