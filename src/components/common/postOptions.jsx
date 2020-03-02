import React, { Component } from "react";
import OtherPostOptions from "./othersPostOptions";
import OwnPostOptions from "./ownPostOptions";

class PostOptions extends Component {
  state = {};

  render() {
    const {
      postBy,
      userId,
      postId,
      reRenderPosts,
      postBody,
      location,
      amountSpend
    } = this.props;

    return (
      <div>
        <i
          className="fa fa-ellipsis-v text-muted"
          id="postOptions"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></i>
        {postBy._id === userId ? (
          <OwnPostOptions
            postId={postId}
            userId={userId}
            postBody={postBody}
            location={location}
            amountSpend={amountSpend}
            reRenderPosts={reRenderPosts}
          />
        ) : (
          <OtherPostOptions
            postId={postId}
            userId={userId}
            reRenderPosts={reRenderPosts}
          />
        )}
      </div>
    );
  }
}

export default PostOptions;
