import React, { Component } from "react";
import { toast } from "react-toastify";
import { hidePost } from "../../services/userService";
import ConfirmHideMarkup from "./confirmHideMarkup";

class OthersPostOptions extends Component {
  state = {};

  handleHide = async () => {
    const body = { userId: this.props.userId, postId: this.props.postId };
    const response = await hidePost(body);
    if (response) {
      this.props.reRenderPosts();
      toast.info("Post hidden successfully");
    } else {
      toast.error("Error hiding post");
    }
  };

  // returns the post options that are posted by others
  render() {
    return (
      <React.Fragment>
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="postOptions"
        >
          <span className="dropdown-item">
            <i className="fa fa-bookmark-o mr-2"></i>Save Post
          </span>
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmHide"
          >
            <i className="fa fa-eye-slash mr-2"></i>Hide Post
          </span>
          <div className="dropdown-divider"></div>
          <span className="dropdown-item">
            <i className="fa fa-ban mr-2"></i>Unfollow User
          </span>
        </div>
        <ConfirmHideMarkup
          title="Hide Post"
          message="Are you sure you want to hide it?"
          handleHide={this.handleHide}
        />{" "}
      </React.Fragment>
    );
  }
}

export default OthersPostOptions;
