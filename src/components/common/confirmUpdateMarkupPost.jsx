import React, { Component } from "react";
import { toast } from "react-toastify";
import CreatePostDetails from "./createPostDetails";
import { getCities } from "../../services/cityService";
import { updatePost } from "../../services/postService";

class ConfirmUpdateMarkup extends Component {
  state = {
    postBody: "",
    location: "",
    amountSpend: "",
    cities: [],
    oPostBody: "",
    oLocation: "",
    oAmountSpend: "",
  };

  async componentDidMount() {
    const { postBody, location, amountSpend } = this.props;
    const { data: cities } = await getCities();
    this.setState({
      location,
      amountSpend,
      postBody,
      cities,
      oPostBody: postBody,
      oLocation: location,
      oAmountSpend: amountSpend,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleUpdate = async () => {
    const { postBody, location, amountSpend } = this.state;

    const body = {
      postBody: postBody,
      location: location,
      amountSpend: amountSpend,
    };
    const response = await updatePost(this.props.postId, body);
    if (response) {
      toast.info("Post has been updated");
      this.props.reRenderPosts();
      this.setState({
        oPostBody: postBody,
        oLocation: location,
        oAmountSpend: amountSpend,
      });
    } else {
      toast.error("Error updating post");
    }
  };

  handleDisable = () => {
    const {
      oPostBody,
      oAmountSpend,
      oLocation,
      postBody,
      location,
      amountSpend,
    } = this.state;
    if (
      oPostBody === postBody &&
      amountSpend === oAmountSpend &&
      oLocation === location
    )
      return true;
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      amountSpend.length === 0
    )
      return true;
    return false;
  };

  restoreState = () => {
    const { oAmountSpend, oLocation, oPostBody } = this.state;
    this.setState({
      postBody: oPostBody,
      location: oLocation,
      amountSpend: oAmountSpend,
    });
  };

  render() {
    return (
      <div
        className="modal fade"
        id="confirmUpdatePost"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmUpdatePostTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Post
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.restoreState}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="createPostBody mb-1"
                name="postBody"
                onChange={this.handleChange}
                value={this.state.postBody}
                autoFocus
              ></textarea>
              <div className="d-flex">
                <CreatePostDetails
                  location={this.state.location}
                  amountSpend={this.state.amountSpend}
                  onChange={this.handleChange}
                  cities={this.state.cities}
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.restoreState}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                disabled={this.handleDisable()}
                onClick={this.handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmUpdateMarkup;
