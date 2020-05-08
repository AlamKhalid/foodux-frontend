import React, { Component } from "react";
import { toast } from "react-toastify";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { deleteComment } from "../../services/commentService";
import ConfirmUpdateMarkupComment from "./confirmUpdateMarkupComment";

class OwnCommentOptions extends Component {
  state = {};

  handleDelete = async () => {
    const response = await deleteComment({
      commentId: this.props.comment,
      postId: this.props.post,
    });
    if (response) {
      toast("Comment has been deleted");
      this.props.reRenderPost();
    } else {
      toast.error("Error deleting comment");
    }
  };

  // returns the own comment options
  render() {
    const { commentBody, reRenderPost, comment, post } = this.props;

    return (
      <React.Fragment>
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="commentOptions"
        >
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmUpdateComment"
          >
            <i className="fa fa-pencil mr-2"></i>Edit Comment
          </span>
          <div className="dropdown-divider"></div>
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmDeleteComment"
          >
            <i className="fa fa-trash mr-2"></i>Delete Comment
          </span>
        </div>
        <ConfirmUpdateMarkupComment
          commentBody={commentBody}
          reRenderPost={reRenderPost}
          comment={comment}
          post={post}
        />
        <ConfirmDeleteMarkup
          title="Delete Comment"
          message="Are you sure you want to delete it?"
          id="confirmDeleteComment"
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default OwnCommentOptions;
