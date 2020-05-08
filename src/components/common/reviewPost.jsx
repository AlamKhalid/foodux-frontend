import React from "react";
import { NavLink } from "react-router-dom";
import PostOptions from "./postOptions";

const ReviewPost = ({ post, userId, reRenderPosts }) => {
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
              <NavLink className="userName" to={`/user/${post.postBy._id}`}>
                {post.postBy.name}
              </NavLink>
              {` ${post.opinion.toLowerCase()} `}
              <NavLink
                className="userName"
                to={`/restaurant/${post.restaurant._id}`}
              >
                {`${post.restaurant.name} ${post.branchArea} ${post.branchCity}`}
              </NavLink>
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
                {post.amountSpend}
              </span>
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-cutlery mr-1"></i>
                {post.ateFood.toString()}
              </span>
            </div>
          </div>
        </div>
        <PostOptions
          post={post}
          userId={userId}
          reRenderPosts={reRenderPosts}
          id="addReview"
        />
      </div>
      <div className="text-left postBody my-3">{post.postBody}</div>
      <div className="d-flex justify-content-between mb-2">
        <span>
          <span className="font-weight-bold mr-2">Taste</span>
          {count.map((i) => (
            <i
              key={i}
              className="fa fa-star"
              style={
                i <= post.tasteRating ? { color: "#FFD800" } : { color: "gray" }
              }
            ></i>
          ))}
        </span>
        <span>
          <span className="font-weight-bold mr-2">Service</span>
          {count.map((i) => (
            <i
              key={i}
              className="fa fa-star"
              style={
                i <= post.serviceRating
                  ? { color: "#FFD800" }
                  : { color: "gray" }
              }
            ></i>
          ))}
        </span>
        <span>
          <span className="font-weight-bold mr-2">Ambience</span>
          {count.map((i) => (
            <i
              key={i}
              className="fa fa-star"
              style={
                i <= post.ambienceRating
                  ? { color: "#FFD800" }
                  : { color: "gray" }
              }
            ></i>
          ))}
        </span>
      </div>
      <hr />
      <div className="mb-3 text-center">
        <span className="font-weight-bold mr-2">Overall Rating</span>
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

export default ReviewPost;
