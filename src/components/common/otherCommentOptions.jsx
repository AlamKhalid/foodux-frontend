import React, { Component } from "react";
import ConfirmHideMarkup from "./confirmHideMarkup";
import { toast } from "react-toastify";
import { hideComment } from "./../../services/userService";

class OtherCommentOptions extends Component {
  state = {};

  handleHide = async () => {
    const response = await hideComment({
      commentId: this.props.commentId,
      userId: this.props.userId
    });
    if (response) {
      this.props.reRenderPost();
      this.props.reRenderComment();
      toast.info("Comment hidden");
    } else {
      toast.error("Error hiding comment");
    }
  };

  // returns the comment options that are posted by others
  render() {
    const { hidden } = this.props;

    return (
      !hidden && (
        <React.Fragment>
          <div
            className="dropdown-menu overflow-hidden"
            aria-labelledby="commentOptions"
          >
            <span
              className="dropdown-item"
              data-toggle="modal"
              data-target="#confirmHide"
            >
              <i className="fa fa-times mr-2"></i>Hide Comment
            </span>
          </div>
          <ConfirmHideMarkup
            title="Hide Comment"
            message="Are you sure you want to hide it?"
            handleHide={this.handleHide}
          />
        </React.Fragment>
      )
    );
  }
}

export default OtherCommentOptions;
