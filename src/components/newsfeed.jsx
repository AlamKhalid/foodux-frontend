import React from "react";
import CreatePost from "./createPost";
import Posts from "./posts";

const Newsfeed = ({ user }) => {
  const isVerified = localStorage.getItem("isVerified").length > 0;

  return (
    <React.Fragment>
      {isVerified ? (
        <React.Fragment>
          <CreatePost user={user} />
          <Posts user={user} profile={false} />
        </React.Fragment>
      ) : null}
    </React.Fragment>
  );
};

export default Newsfeed;
