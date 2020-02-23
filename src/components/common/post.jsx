import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Comment from "./comment";
import AddComment from "./addComment";
import PostButtons from "./postButtons";
import PostOptions from "./postOptions";

class Post extends Component {
  state = {};
  render() {
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
                Name of user
              </NavLink>
              <span className="text-muted postTime">4 hrs</span>
            </div>
          </div>
          <PostOptions />
        </div>
        <div className="text-left postBody my-3">This is the post body</div>
        <div className="d-flex justify-content-between mb-2">
          <span className="text-muted">13K likes</span>
          <span className="text-muted">22 comments</span>
        </div>
        <PostButtons />
        <Comment />
        <Comment />
        <AddComment />
      </div>
    );
  }
}

export default Post;
