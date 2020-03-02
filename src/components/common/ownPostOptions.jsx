import React, { Component } from "react";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import CreatePostDetails from "./createPostDetails";
import ConfirmDeleteMarkup from "./confirmDeleteMarkup";
import { deletePost, updatePost } from "../../services/postService";
import { getCities } from "../../services/cityService";

class OwnPostOptions extends Component {
  state = { postBody: "", location: "", amountSpend: "", cities: [] };

  async componentDidMount() {
    const { postBody, location, amountSpend } = this.props;
    const { data: cities } = await getCities();
    this.setState({ location, amountSpend, postBody, cities });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  confirmEdit = () => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1 className="title-popup mb-3">Edit Post</h1>
            <textarea
              className="createPostBody mb-1"
              name="postBody"
              onChange={this.handleChange}
              defaultValue={this.state.postBody}
              autoFocus
            ></textarea>
            <div className="d-flex mb-3">
              <CreatePostDetails
                location={this.state.location}
                amountSpend={this.state.amountSpend}
                onChange={this.handleChange}
                cities={this.state.cities}
              />
            </div>
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

  handleUpdate = async () => {
    const { postBody, location, amountSpend } = this.state;
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      amountSpend.length === 0
    ) {
      toast.error("Error updating post...");
      setTimeout(function() {
        toast.error("Some values are missing");
      }, 1000);
    } else {
      const body = {
        postBody: postBody,
        location: location,
        amountSpend: amountSpend
      };
      const response = await updatePost(this.props.postId, body);
      if (response) {
        toast.info("Post has been updated");
        this.props.reRenderPosts();
      } else {
        toast.error("Error updating post");
      }
    }
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
        <span className="dropdown-item" onClick={this.confirmEdit}>
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
