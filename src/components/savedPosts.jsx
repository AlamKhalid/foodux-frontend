import React from "react";
import HorizontalMenu from "./common/horizontalMenu";

const SavedPosts = () => {
  return (
    <div
      id="collapseFour"
      className="collapse"
      aria-labelledby="saved-posts"
      data-parent="#accordion"
    >
      <div className="card-body">
        <HorizontalMenu />
      </div>
    </div>
  );
};

export default SavedPosts;
