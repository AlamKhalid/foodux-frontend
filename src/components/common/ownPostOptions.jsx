import React, { Component } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { deletePost } from "../../services/postService";

class OwnPostOptions extends Component {
  state = {};

  confirmEdit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {}
    });
  };

  confirmDelete = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <ConfirmDeleteMarkup
            title="Delete Post"
            message="Are you sure you want to delete it?"
            onClose={onClose}
            handleDelete={this.handleDelete}
          />
        );
      }
    });
  };

  handleDelete = async () => {
    const response = await deletePost({
      userId: this.props.userId,
      postId: this.props.postId
    });
    if (response) {
      toast.info("Post has been deleted");
      this.props.reRenderPosts();
    } else {
      toast.error("Error deleting post");
    }
  };

  // returns the own post options
  render() {
    return (
      <div
        className="dropdown-menu overflow-hidden"
        aria-labelledby="postOptions"
      >
        <span className="dropdown-item">
          <i className="fa fa-pencil mr-2"></i>Edit Post
        </span>
        <div className="dropdown-divider"></div>
        <span className="dropdown-item" onClick={this.confirmDelete}>
          <i className="fa fa-trash mr-2"></i>Delete Post
        </span>
      </div>
    );
  }
}

export default OwnPostOptions;
