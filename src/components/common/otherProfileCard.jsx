import React from "react";

const OtherProfileCard = ({ user, following }) => {
  return (
    <div className="col-3 card">
      <img
        className="card-img-top mt-2"
        src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
        alt=""
      />
      <div className="card-body text-center">
        <h5 className="card-title">{user.name}</h5>
        <button className="btn foodux-btn">
          {following ? "Unfollow" : "Follow"}
        </button>
        <p
          className="foodux-link mt-2"
          onClick={() => (window.location = `/user/${user._id}`)}
        >
          View Profile
        </p>
      </div>
    </div>
  );
};

export default OtherProfileCard;
