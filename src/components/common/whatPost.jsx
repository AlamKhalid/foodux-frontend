import React from "react";
import { NavLink } from "react-router-dom";
import PostOptions from "./postOptions";

const WhatPost = ({ post, userId, reRenderPosts }) => {
  const count = [1, 2, 3, 4, 5];

  return (
    <React.Fragment>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <img
            className="displayPostPicture"
            src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
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
              {` added a what you can eat post`}
            </span>
            <div className="d-flex justify-content-between">
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-user"></i>
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
                {post.budget}
              </span>
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-map-marker mr-1"></i>
                {post.location}
              </span>
            </div>
          </div>
        </div>
        <PostOptions
          userId={userId}
          post={post}
          reRenderPosts={reRenderPosts}
          id="addWhat"
        />
      </div>
      <h6 className="mt-3">
        What you can eat in{" "}
        <span className="font-weight-bold">{post.location} </span>for{" "}
        <span className="font-weight-bold">{post.budget}</span>
      </h6>
      <div className="text-left postBody my-3">{post.postBody}</div>
      <hr />
      <div>
        Food
        <span className="font-weight-bold ml-2 foodux-link">
          {post.ateFood.toString()}
        </span>
      </div>
      <div>
        Restaurants
        <span className="font-weight-bold ml-2 foodux-link">
          {post.restaurantsBeen.map((res) => res.name).toString()}
        </span>
      </div>

      <div className="mb-3">
        <span className=" mr-2">Overall Experience</span>
        {count.map((i) => (
          <i
            key={i}
            className="fa fa-star"
            style={
              i <= post.overallRating ? { color: "#FFD800" } : { color: "gray" }
            }
          ></i>
        ))}
      </div>
    </React.Fragment>
  );
};

export default WhatPost;
