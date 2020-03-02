import React, { Component } from "react";
import { toast } from "react-toastify";
import { postComment } from "../../services/commentService";

class AddComment extends Component {
  state = {
    enterCommentBtnClass: "d-none", // specifies the class for enter comment button which is paper-plane
    commentBody: "" // the comment that user enters in the comment textbox
  };

  handleChange = ({ target }) => {
    // used by comment textbox to update the current commentBody state
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFocus = () => {
    // to handle focus of comment textbox, displays the paper-plane button on focus
    let enterCommentBtnClass = "";
    this.setState({ enterCommentBtnClass });
  };

  handleBlur = () => {
    // to handle focusOut of comment textbox, paper-plane disappears if commentBody's length is equal to 0
    if (this.state.commentBody.length === 0) {
      const enterCommentBtnClass = "d-none";
      this.setState({ enterCommentBtnClass });
    }
  };

  handleKeyDown = e => {
    // for user's convenience, can also press enter to submit comment along with pressing paper-plane button
    if (e.key === "Enter") {
      this.handleClick();
    }
  };

  // handle submit comment event upon either clicking paper-plane or by pressing Enter button
  handleClick = async () => {
    // checks for valid commentBody length
    if (this.state.commentBody.length > 0) {
      const comment = {
        commentBody: this.state.commentBody,
        postId: this.props.postId,
        userId: this.props.userId
      }; // defines the comment object with necessary keys to be send to backend server
      const response = await postComment(comment); // call backend to post comment
      if (response) {
        // updating the state and re-render the post
        const commentBody = "";
        const enterCommentBtnClass = "d-none";
        this.setState({ commentBody, enterCommentBtnClass });
        this.props.reRenderPost();
        toast.info("Comment added successfully");
      } else {
        // toast any error if there is a problem submitting the comment
        toast.error("Error submitting comment");
      }
    }
  };

  render() {
    // destructuring the state of the class
    const { enterCommentBtnClass } = this.state;

    return (
      <div className="d-flex flex-row">
        <img
          className="commentPic"
          src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
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
