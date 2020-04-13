import React from "react";
import _ from "lodash";
import ProfileAbout from "./profileAbout";
import CreatePost from "./createPost";
import Posts from "./posts";
import ProfileRestaurantVisited from "./profileRestaurantVisited";
import UploadedPhotos from "./uploadedPhotos";

const ProfileNavOption = ({ user, userProfile }) => {
  return (
    <div className="row">
      <div className="col-4 d-flex flex-column">
        <ProfileAbout />
        <ProfileRestaurantVisited />
        <UploadedPhotos />
      </div>
      <div className="col-8">
        {userProfile._id === user._id && <CreatePost user={user} />}
        {!_.isEmpty(userProfile) && (
          <Posts userId={userProfile._id} profile={true} />
        )}
      </div>
    </div>
  );
};

export default ProfileNavOption;
