import React from "react";
import { NavLink } from "react-router-dom";
import FollowButton from "./followButton";
import ConfirmUnfollowUser from "./confirmUnfollowUser";

const OtherProfileCard = ({ user, following, currentUser, refreshProfile }) => {
  return (
    <React.Fragment>
      <div className="col-3 card">
        <img
          className="card-img-top mt-2"
          src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
          alt=""
        />
        <div className="card-body text-center">
          <h5 className="card-title">{user.name}</h5>
          {user._id !== currentUser._id && (
            <FollowButton following={following} />
          )}
          <br />
          <NavLink
            className="foodux-link"
            to={`/user/${user._id}`}
            onClick={() => {
              refreshProfile(user._id);
            }}
          >
            View Profile
          </NavLink>
        </div>
      </div>
      <ConfirmUnfollowUser user={user} />
    </React.Fragment>
  );
};

export default OtherProfileCard;
