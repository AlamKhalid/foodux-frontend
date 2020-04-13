import React, { useState, useEffect } from "react";

const FollowButton = ({ following }) => {
  const [buttonAttr, setButtonAttr] = useState({});

  useEffect(() => {
    if (following) {
      setButtonAttr({
        "data-toggle": "modal",
        "data-target": "#confirmUnfollow",
      });
    }
  }, [following]);
  return (
    <button className="btn foodux-btn mb-2" {...buttonAttr}>
      {following && <i className="fa fa-check mr-2"></i>}
      {following ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
