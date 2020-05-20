import React from "react";
import HorizontalMenu from "./common/horizontalMenu";

const HiddenPosts = ({ user }) => {
  return (
    <div
      id="collapseFive"
      className="collapse"
      aria-labelledby="hidden-posts"
      data-parent="#accordion"
    >
      <div className="card-body">
        <HorizontalMenu
          id="hidden-posts-items"
          items={user.hiddenPosts}
          label="hidden"
        />
      </div>
    </div>
  );
};

export default HiddenPosts;
