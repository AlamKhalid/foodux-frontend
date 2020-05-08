import React, { Component } from "react";
import OtherPostOptions from "./othersPostOptions";
import OwnPostOptions from "./ownPostOptions";

class PostOptions extends Component {
  state = {};

  render() {
    const { post, userId, reRenderPosts, id } = this.props;
    const { postBy } = post;

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
            post={post}
            userId={userId}
            reRenderPosts={reRenderPosts}
            id={id}
          />
        ) : (
          <OtherPostOptions
            postId={post._id}
            userId={userId}
            reRenderPosts={reRenderPosts}
          />
        )}
      </div>
    );
  }
}

export default PostOptions;
