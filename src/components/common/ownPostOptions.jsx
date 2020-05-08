import React, { Component } from "react";
import { toast } from "react-toastify";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { deletePost } from "../../services/postService";

class OwnPostOptions extends Component {
  state = {};

  handleDelete = async () => {
    let response;

    response = await deletePost({
      userId: this.props.userId,
      postId: this.props.post._id,
    });

    if (response) {
      toast("Post has been deleted");
      this.props.reRenderPosts();
    } else {
      toast.error("Error deleting post");
    }
  };

  // returns the own post options
  render() {
    const { id, post } = this.props;

    return (
      <React.Fragment>
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="postOptions"
        >
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target={`#${id}`}
            onClick={() => localStorage.setItem("post", JSON.stringify(post))}
          >
            <i className="fa fa-pencil mr-2"></i>Edit Post
          </span>
          <div className="dropdown-divider"></div>
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmDeletePost"
          >
            <i className="fa fa-trash mr-2"></i>Delete Post
          </span>
        </div>
        <ConfirmDeleteMarkup
          title="Delete Post"
          message="Are you sure you want to delete it?"
          id="confirmDeletePost"
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default OwnPostOptions;
