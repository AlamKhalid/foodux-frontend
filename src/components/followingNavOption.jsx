import React, { useState, useEffect } from "react";
import _ from "lodash";
import OtherProfileCard from "./common/otherProfileCard";
import { getFollowing } from "../services/userService";

const FollowingNavOption = ({ userProfile, user }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(userProfile)) {
        const { data: obj } = await getFollowing(userProfile._id);
        setFollowing(obj.following);
      }
    }
    getData();
  }, [userProfile]);

  return following.length > 0 ? (
    <div className="row mx-2">
      {following.map((follow) => (
        <OtherProfileCard key={follow._id} user={follow} />
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
