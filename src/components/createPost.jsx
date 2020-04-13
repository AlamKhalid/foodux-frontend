import React, { Component } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import CreatePostDetails from "./common/createPostDetails";
import { submitPost } from "../services/postService";
import { getCities } from "../services/cityService";

class CreatePost extends Component {
  state = {
    postPopupsClasses: "d-none",
    postBody: "",
    location: "",
    amountSpend: "",
    cities: [],
  };

  async componentDidMount() {
    const { data: cities } = await getCities();
    this.setState({ cities });
  }

  handleFocus = () => {
    const postPopupsClasses = "d-flex justify-content-between";
    this.setState({ postPopupsClasses });
  };

  handleBlur = () => {
    const { postBody } = this.state;

    if (postBody.length === 0) {
      const classes = "d-none";
      this.setState({ postPopupsClasses: classes });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  disableButton = () => {
    const { postBody, location, amountSpend, cities } = this.state;
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      amountSpend.length === 0
    )
      return true;
    if (cities.indexOf(location) === -1) return true;
    return false;
  };

  handleClick = async () => {
    const { user } = this.props;
    const response = await submitPost({
      ..._.pick(this.state, ["postBody", "location", "amountSpend"]),
      _id: user._id,
      postBy: user._id,
    });
    if (response) {
      window.location.reload();
    } else {
      toast.error("Error creating a post");
    }
  };

  render() {
    const {
      postBody,
      postPopupsClasses,
      location,
      cities,
      amountSpend,
    } = this.state;
    return (
      <div className="bg-light p-2 rounded-lg">
        <h6 className="text-left text-muted mb-3">Create Review</h6>
        <textarea
          className="createPostBody"
          placeholder="What you had today?"
          name="postBody"
          value={postBody}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        ></textarea>
        <div className={postPopupsClasses}>
          <div className="mt-1">
            <CreatePostDetails
              location={location}
              amountSpend={amountSpend}
              onChange={this.handleChange}
              cities={cities}
            />
          </div>
          <div>
            <button
              className="btn"
              id="createPostBtn"
              disabled={this.disableButton()}
              onClick={this.handleClick}
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default CreatePost;
