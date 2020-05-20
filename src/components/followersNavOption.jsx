import React, { useState, useEffect } from "react";
import OtherProfileCard from "./common/otherProfileCard";
import { getFollowers, getFollowing } from "../services/userService";

const FollowersNavOption = ({ userProfile, user, refreshProfile }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [currentUserFollowing, setCurrentUserFollowing] = useState([]);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    async function getData() {
      if (isMounted) {
        const { data: obj1 } = await getFollowers(userProfile._id);
        const { data: obj2 } = await getFollowing(user._id);
        setFollowers(obj1.followers);
        setCurrentUserFollowing(obj2.following);
      }
    }
    getData();
  }, [userProfile, user, isMounted]);

  return (
    <React.Fragment>
      <input
        type="text"
        className="search-icon mt-1"
        placeholder="Search user..."
      />
      {followers.length > 0 ? (
        <React.Fragment>
          <div className="row mx-2 mt-2">
            {followers.map((follower) => (
              <OtherProfileCard
                key={follower._id}
                user={follower}
                currentUser={user}
                refreshProfile={refreshProfile}
                following={currentUserFollowing.find(
                  (item) => item._id === follower._id
                )}
              />
            ))}
          </div>
        </React.Fragment>
      ) : (
        <p className="bg-light pt-3 px-3 pb-2 my-3 rounded-lg text-center text-muted">
          No followers to show
        </p>
      )}
    </React.Fragment>
  );
};

export default FollowersNavOption;
