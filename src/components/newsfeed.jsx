import React from "react";
import CreatePost from "./createPost";
import Posts from "./posts";

const Newsfeed = ({ user }) => {
  return (
    <React.Fragment>
      <CreatePost user={user} />
      <Posts userId={user._id} profile={false} />
    </React.Fragment>
  );
};

export default Newsfeed;
