import React, { Component } from "react";
import { toast } from "react-toastify";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { deletePost } from "../../services/postService";
import ConfirmUpdateMarkupPost from "./confirmUpdateMarkupPost";

class OwnPostOptions extends Component {
  state = {};

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
    const {
      postBody,
      location,
      amountSpend,
      reRenderPosts,
      postId
    } = this.props;

    return (
      <React.Fragment>
        <div
          className="dropdown-menu overflow-hidden"
          aria-labelledby="postOptions"
        >
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmUpdatePost"
          >
            <i className="fa fa-pencil mr-2"></i>Edit Post
          </span>
          <div className="dropdown-divider"></div>
          <span
            className="dropdown-item"
            data-toggle="modal"
            data-target="#confirmDelete"
          >
            <i className="fa fa-trash mr-2"></i>Delete Post
          </span>
        </div>
        <ConfirmUpdateMarkupPost
          postBody={postBody}
          location={location}
          amountSpend={amountSpend}
          reRenderPosts={reRenderPosts}
          postId={postId}
        />
        <ConfirmDeleteMarkup
          title="Delete Post"
          message="Are you sure you want to delete it?"
          handleDelete={this.handleDelete}
        />
      </React.Fragment>
    );
  }
}

export default OwnPostOptions;
