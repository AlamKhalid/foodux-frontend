import React from "react";
import ProfileAbout from "./profileAbout";
import CreatePost from "./createPost";
import Posts from "./posts";
import ProfileRestaurantVisited from "./profileRestaurantVisited";

const ProfileNavOption = ({ user, userProfile }) => {
  return (
    <div className="row">
      <div className="col-4 d-flex flex-column">
        <ProfileAbout userProfile={userProfile} />
        <ProfileRestaurantVisited userProfile={userProfile} />
      </div>
      <div className="col-8">
        {userProfile._id === user._id && <CreatePost user={user} />}
        <Posts user={userProfile} profile={true} />
      </div>
    </div>
  );
};

export default ProfileNavOption;
