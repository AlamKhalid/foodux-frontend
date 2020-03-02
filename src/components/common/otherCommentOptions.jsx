import React, { Component } from "react";
import ConfirmHideMarkup from "./confirmHideMarkup";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import { hideComment } from "./../../services/userService";

class OtherCommentOptions extends Component {
  state = {};

  confirmHideComment = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmHideMarkup
            onClose={onClose}
            title="Hide Comment"
            message="Are you sure you want to hide it?"
            handleHide={this.handleHide}
          />
        );
      }
    });
  };

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
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="commentOptions"
        >
          <span className="dropdown-item" onClick={this.confirmHideComment}>
            <i className="fa fa-times mr-2"></i>Hide Comment
          </span>
        </div>
      )
    );
  }
}

export default OtherCommentOptions;
