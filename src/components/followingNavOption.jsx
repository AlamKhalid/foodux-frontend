import React, { useState, useEffect } from "react";
import _ from "lodash";
import OtherProfileCard from "./common/otherProfileCard";
import { getFollowing } from "../services/userService";

const FollowingNavOption = ({ userProfile, user }) => {
  const [following, setFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(userProfile)) {
        const { data: obj1 } = await getFollowing(userProfile._id);
        if (userProfile._id !== user._id) {
          const { data: obj2 } = await getFollowing(user._id);
          setCurrentUserFollowing(obj2.following);
        } else {
          setCurrentUserFollowing(obj1.following);
        }
        setFollowing(obj1.following);
      }
    }
    getData();
  }, [userProfile, user]);

  return following.length > 0 ? (
    <div className="row mx-2">
      {following.map((follow) => (
        <OtherProfileCard
          key={follow._id}
          user={follow}
          currentUser={user}
          following={currentUserFollowing.find(
            (item) => item._id === follow._id
          )}
        />
      ))}
    </div>
  ) : (
    <p className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg text-center text-muted">
      {userProfile._id === user._id
        ? "You are following 0 people"
        : `${userProfile.name} is following 0 people`}
    </p>
  );
};

export default FollowingNavOption;
