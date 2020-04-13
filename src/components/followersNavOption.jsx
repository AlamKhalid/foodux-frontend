import React, { useState, useEffect } from "react";
import _ from "lodash";
import OtherProfileCard from "./common/otherProfileCard";
import { getFollowers, getFollowing } from "../services/userService";

const FollowersNavOption = ({ userProfile, user }) => {
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(userProfile)) {
        const { data: obj1 } = await getFollowers(userProfile._id);
        const { data: obj2 } = await getFollowing(user._id);
        setFollowers(obj1.followers);
        setFollowing(obj2.following);
      }
    }
    getData();
  }, [userProfile, user]);

  return followers.length > 0 ? (
    <div className="row mx-2">
      {followers.map((follower) => (
        <OtherProfileCard
          key={follower._id}
          user={follower}
          following={following.indexOf(follower) > -1 ? true : false}
        />
      ))}
    </div>
  ) : (
    <p className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg text-center text-muted">
      No followers to show
    </p>
  );
};

export default FollowersNavOption;
