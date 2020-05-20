import React from "react";
import { NavLink } from "react-router-dom";
import PostOptions from "./postOptions";

const AnnouncementPost = ({ post, userId, reRenderPosts }) => {
  return (
    <React.Fragment>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            className="displayPostPicture"
            src={post.postBy.profilePic}
            alt=""
          />
          <div className="d-flex flex-column align-items-start">
            <span>
              <NavLink
                className="userName"
                to={`/restaurant/${post.postBy._id}`}
              >
                {post.postBy.name}
              </NavLink>
              {` added a new item in the menu`}
            </span>
            <div className="d-flex justify-content-between">
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-bank"></i>
              </span>
              <span className="text-muted postDetails mr-3">
                <i className="fa fa-calendar mr-1"></i>
                {post.date}
              </span>
              <span className="text-muted postDetails mr-3">
                <i className="fa fa-clock-o mr-1"></i>
                {post.time}
              </span>
              <span className="postDetails text-muted mr-3">
                <i className="fa fa-money mr-1"></i>
                {post.price}
              </span>
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-cutlery mr-1"></i>
                {post.foodType}
              </span>
            </div>
          </div>
        </div>
        <PostOptions
          userId={userId}
          post={post}
          reRenderPosts={reRenderPosts}
          id="addAnnouncement"
        />
      </div>
      <div className="text-left postBody my-3">{post.postBody}</div>
    </React.Fragment>
  );
};

export default AnnouncementPost;
