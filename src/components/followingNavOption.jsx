import React, { useState, useEffect } from "react";
import OtherProfileCard from "./common/otherProfileCard";
import { getFollowing } from "../services/userService";

const FollowingNavOption = ({ userProfile, user, refreshProfile }) => {
  const [following, setFollowing] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: obj1 } = await getFollowing(userProfile._id);
      if (userProfile._id !== user._id) {
        const { data: obj2 } = await getFollowing(user._id);
        setCurrentUserFollowing(obj2.following);
      } else {
        setCurrentUserFollowing(obj1.following);
      }
      setFollowing(obj1.following);
    }

    getData();
  }, [userProfile, user]);

  return (
    <React.Fragment>
      <input
        type="text"
        className="expand search-icon circle mt-1"
        placeholder="   Search user..."
      />
      {following.length > 0 ? (
        <React.Fragment>
          <div className="row mx-2 mt-2">
            {following.map((follow) => (
              <OtherProfileCard
                key={follow._id}
                user={follow}
                currentUser={user}
                refreshProfile={refreshProfile}
                following={currentUserFollowing.find(
                  (item) => item._id === follow._id
                )}
              />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <p className="bg-light pt-3 px-3 pb-2 my-3 rounded-lg text-center text-muted">
          {userProfile._id === user._id
            ? "You are following 0 users"
            : `${userProfile.name} is following 0 users`}
        </p>
      )}
    </React.Fragment>
  );
};

export default FollowingNavOption;
