import React, { Component } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { updateComment } from "../../services/commentService";
import { deleteComment } from "../../services/commentService";

class OwnCommentOptions extends Component {
  state = {
    comment: "",
    editedComment: ""
  };

  componentDidMount() {
    this.setState({ comment: this.props.commentBody });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleUpdate = async () => {
    const comment = {
      commentId: this.props.comment,
      postId: this.props.post,
      commentBody: this.state.editedComment
    };
    const response = await updateComment(comment);
    if (response) {
      toast.info("Comment has been updated");
      this.props.reRenderPost();
    } else {
      toast.error("Error editing comment");
    }
  };

  confirmEdit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="title-popup mb-3">Edit Comment</h1>
            <textarea
              className="createPostBody h-auto mb-2"
              name="editedComment"
              defaultValue={this.state.comment}
              onChange={this.handleChange}
              autoFocus
            ></textarea>
            <button
              className="btn btn-warning btn-sm mr-2"
              onClick={() => {
                this.handleUpdate();
                onClose();
              }}
            >
              Update
            </button>
            <button className="btn btn-dark btn-sm" onClick={onClose}>
              Cancel
            </button>
          </div>
        );
      }
    });
  };

  confirmDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteMarkup
            title="Delete Comment"
            message="Are you sure you want to delete it?"
            onClose={onClose}
            handleDelete={this.handleDelete}
          />
        );
      }
    });
  };

  handleDelete = async () => {
    const response = await deleteComment({
      commentId: this.props.comment,
      postId: this.props.post
    });
    if (response) {
      toast.info("Comment has been deleted");
      this.props.reRenderPost();
    } else {
      toast.error("Error deleting comment");
    }
  };

  // returns the own comment options
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="commentOptions"
      >
        <span className="dropdown-item" onClick={this.confirmEdit}>
          <i className="fa fa-pencil mr-2"></i>Edit Comment
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item" onClick={this.confirmDelete}>
          <i className="fa fa-trash mr-2"></i>Delete Comment
        </span>
      </div>
    );
  }
}

export default OwnCommentOptions;
