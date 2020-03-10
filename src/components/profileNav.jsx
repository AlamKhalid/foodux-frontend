import React, { Component } from "react";

class ProfileNav extends Component {
  state = {};
  render() {
    return (
      <div className="row my-3 mx-1 bg-light profile-nav rounded-lg">
        <div className="col-3 py-2 text-center profile-item">About</div>
        <div className="col-3 py-2 text-center profile-item active-profile-item">
          Profile
        </div>
        <div className="col-3 py-2 text-center profile-item">Followers</div>
        <div className="col-3 py-2 text-center profile-item">Following</div>
      </div>
    );
  }
}

export default ProfileNav;
