import React, { Component } from "react";
import _ from "lodash";
import { getCities } from "../services/cityService";
import { submitPost } from "../services/postService";

class CreatePost extends Component {
  state = {
    postPopupsClasses: "d-none",
    postBody: "",
    location: "",
    amountSpend: "",
    cities: []
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
    if (this.state.postBody.length === 0) {
      const classes = "d-none";
      this.setState({ postPopupsClasses: classes });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  disableButton = () => {
    const { postBody, location, amountSpend } = this.state;
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      amountSpend.length === 0
    )
      return true;
    return false;
  };

  handleClick = async () => {
    const response = await submitPost({
      ..._.pick(this.state, ["postBody", "location", "amountSpend"]),
      _id: this.props.user._id,
      postBy: this.props.user._id
    });
    if (response) {
      console.log("post created successfully");
    } else {
      console.log("error creating a post");
    }
  };

  render() {
    return (
      <div className="bg-light p-2">
        <h6 className="text-left text-muted mb-3">Create Review</h6>
        <textarea
          className="createPostBody"
          placeholder="What you had today?"
          name="postBody"
          value={this.state.postBody}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        ></textarea>
        <div className={this.state.postPopupsClasses} id="postPopups">
          <div className="mt-1">
            <input
              name="location"
              list="locations"
              value={this.state.location}
              className="expand location-icon mr-1"
              onChange={this.handleChange}
            />
            <datalist id="locations">
              {this.state.cities.map(city => (
                <option key={city} value={city} />
              ))}
            </datalist>
            <input
              type="text"
              name="amountSpend"
              value={this.state.amountSpend}
              className="expand dollar-icon"
              onChange={this.handleChange}
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
