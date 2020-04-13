import React, { Component } from "react";
import $ from "jquery";
import _ from "lodash";
import FollowButton from "./common/followButton";
import ConfirmUnfollowUser from "./common/confirmUnfollowUser";
import { getFollowing } from "../services/userService";

class MyProfile extends Component {
  state = {
    settingsClass: "text-muted",
    following: false,
  };

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.userProfile._id !== nextProps.userProfile._id ||
      this.state.following !== nextState.following
    )
      return true;
    return false;
  }

  async componentDidUpdate() {
    const { user, userProfile } = this.props;
    const { data: obj } = await getFollowing(user._id);
    if (obj.following.find((item) => item._id === userProfile._id)) {
      this.setState({ following: true });
    }
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
    const { settingsClass, following } = this.state;
    const { userProfile, profile } = this.props;
    const isUserEmpty = _.isEmpty(userProfile);

    return (
      <React.Fragment>
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
              <span className="profile-name">
                {isUserEmpty ? "" : userProfile.name}
              </span>
              <span>Posts: {isUserEmpty ? 0 : userProfile.posts.length}</span>
              <span>
                Followers: {isUserEmpty ? 0 : userProfile.followers.length}
              </span>
              <span className="mb-2">
                Following: {isUserEmpty ? 0 : userProfile.following.length}
              </span>
              {profile && <FollowButton following={following} />}
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
        <ConfirmUnfollowUser user={userProfile} />
      </React.Fragment>
    );
  }
}

export default MyProfile;
