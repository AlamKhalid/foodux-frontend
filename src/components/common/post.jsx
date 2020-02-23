import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Comment from "./comment";
import AddComment from "./addComment";
import PostButtons from "./postButtons";
import PostOptions from "./postOptions";

class Post extends Component {
  state = {};

  render() {
    const { post, userId } = this.props;

    return (
      <div className="bg-light pt-3 px-3 pb-2 my-2">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              className="displayPostPicture"
              src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
              alt=""
            />
            <div className="d-flex flex-column align-items-start">
              <NavLink className="userName" to="/">
                {post.postBy.name}
              </NavLink>
              <div className="d-flex justify-content-between">
                <span className="mr-3 postDetails text-muted">
                  <i className="fa fa-user"></i>
                </span>
                <span className="text-muted postDetails mr-3">
                  <i className="fa fa-clock-o mr-1"></i>
                  {post.time}
                </span>
                <span className="mr-3 postDetails text-muted">
                  <i className="fa fa-map-marker mr-1"></i>
                  {post.location}
                </span>
                <span className="postDetails text-muted">
                  <i className="fa fa-money mr-1"></i>
                  {post.amountSpend}
                </span>
              </div>
            </div>
          </div>
          <PostOptions />
        </div>
        <div className="text-left postBody my-3">{post.postBody}</div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">{post.likes.length} Likes</span>
          <span className="text-muted">{post.comments.length} Comments</span>
        </div>
        <PostButtons />
        {post.comments.map(comment => (
          <Comment key={comment._id} comment={comment} />
        ))}
        <AddComment postId={post._id} userId={userId} />
      </div>
    );
  }
}

export default Post;
