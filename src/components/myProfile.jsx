import React, { Component } from "react";
import $ from "jquery";
import _ from "lodash";

class MyProfile extends Component {
  state = {
    settingsClass: "text-muted",
  };

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
  }

  handleClick = () => {
    window.location = "/user/:id/settings";
  };

  handleFocus = () => {
    const settingsClass = "";
    this.setState({ settingsClass });
  };

  handleBlur = () => {
    const settingsClass = "text-muted";
    this.setState({ settingsClass });
  };

  render() {
    const { settingsClass } = this.state;
    const { user, profile } = this.props;
    const isUserEmpty = _.isEmpty(user);

    return (
      <div className="d-flex justify-content-between bg-light rounded-lg p-3 mb-2">
        <div className="d-flex">
          <div className="profile-pic-div">
            <img
              className="profile-pic"
              src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
              alt=""
            />
          </div>
          <div className="d-flex flex-column ml-4">
            <span className="profile-name">{isUserEmpty ? "" : user.name}</span>
            <span>Posts: {isUserEmpty ? 0 : user.posts.length}</span>
            <span>Followers: {isUserEmpty ? 0 : user.followers.length}</span>
            <span>Following: {isUserEmpty ? 0 : user.following.length}</span>
            {profile && <button className="btn foodux-btn mt-2">Follow</button>}
          </div>
        </div>
        {!profile && (
          <i
            className={`fa fa-cog fa-2x mr-4 ${settingsClass}`}
            onMouseEnter={this.handleFocus}
            onMouseLeave={this.handleBlur}
            data-toggle="tooltip"
            data-placement="top"
            title="Settings"
            onClick={this.handleClick}
          ></i>
        )}
      </div>
    );
  }
}

export default MyProfile;
