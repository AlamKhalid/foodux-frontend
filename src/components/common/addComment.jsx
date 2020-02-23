import React, { Component } from "react";
import { postComment } from "../../services/commentService";

class AddComment extends Component {
  state = {
    enterCommentBtnClass: "d-none",
    commentBody: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFocus = () => {
    let enterCommentBtnClass = "";
    this.setState({ enterCommentBtnClass });
  };

  handleBlur = () => {
    if (this.state.commentBody.length === 0) {
      const enterCommentBtnClass = "d-none";
      this.setState({ enterCommentBtnClass });
    }
  };

  handleKeyDown = e => {
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  handleClick = async () => {
    if (this.state.commentBody.length > 0) {
      const comment = {
        commentBody: this.state.commentBody,
        postId: this.props.postId,
        userId: this.props.userId
      };
      const response = await postComment(comment);
      if (response) {
        const commentBody = "";
        const enterCommentBtnClass = "d-none";
        this.setState({ commentBody, enterCommentBtnClass });
        window.location = "/home";
      } else {
        console.log("Error submitting comment");
      }
    }
  };

  render() {
    const { enterCommentBtnClass } = this.state;

    return (
      <div className="d-flex flex-row">
        <img
          className="commentPic"
          src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
          alt=""
        />
        <input
          className="commentField mr-2"
          type="text"
          name="commentBody"
          value={this.state.commentBody}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onKeyDown={this.handleKeyDown}
          placeholder="Add a comment..."
        />
        <i
          className={`mt-2 fa fa-paper-plane ${enterCommentBtnClass}`}
          onClick={this.handleClick}
        ></i>
      </div>
    );
  }
}

export default AddComment;
