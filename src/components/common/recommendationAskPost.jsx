import React from "react";
import { NavLink } from "react-router-dom";
import PostOptions from "./postOptions";

const RecommendationAskPost = ({ post, userId, reRenderPosts }) => {
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
              </NavLink>{" "}
              is asking for recommendations in{" "}
              <NavLink className="userName" to="/">
                {post.location}
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
          post={post}
          userId={userId}
          reRenderPosts={reRenderPosts}
          id="addRecommendation"
        />
      </div>
      <div className="text-left postBody my-3">{post.postBody}</div>
      <hr />
      <div>
        <span className="font-weight-bold mr-2">Estimated Budget</span>
        {post.budget}
      </div>
      <div>
        <span className="font-weight-bold mr-2">Preferred Food</span>
        {post.preferredFood.toString()}
      </div>
      <div className="mb-2">
        <span className="font-weight-bold mr-2">Preferred Restaurant Type</span>
        {post.preferredType.toString()}
      </div>
    </React.Fragment>
  );
};

export default RecommendationAskPost;
