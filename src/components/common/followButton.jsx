import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { startFollowing } from "../../services/userService";

const FollowButton = ({ user, currentUser, following, refreshProfile }) => {
  const [buttonAttr, setButtonAttr] = useState({});

  useEffect(() => {
    if (following) {
      setButtonAttr({
        "data-toggle": "modal",
        "data-target": "#confirmUnfollow",
      });
    }
  }, [following]);

  const handleFollowing = async () => {
    if (!following) {
      const response = await startFollowing(currentUser._id, {
        userId: user._id,
      });
      if (response) {
        refreshProfile(-1);
      } else {
        toast.error("Error following the user");
      }
    }
  };

  return (
    <button
      className="btn foodux-btn mb-2"
      {...buttonAttr}
      onClick={handleFollowing}
    >
      {following && <i className="fa fa-check mr-2"></i>}
      {following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
