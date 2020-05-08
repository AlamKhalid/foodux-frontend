import React from "react";
import { NavLink } from "react-router-dom";
import PostOptions from "./postOptions";

const DealPost = ({ post, userId, reRenderPosts }) => {
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
              </NavLink>{" "}
              is offering a discount
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
                {`${post.discount}%`}
              </span>
              <span className="mr-3 postDetails text-muted">
                <i className="fa fa-cutlery mr-1"></i>
                {post.dealItems.toString()}
              </span>
            </div>
          </div>
        </div>
        <PostOptions
          userId={userId}
          post={post}
          reRenderPosts={reRenderPosts}
          id="addDeal"
        />
      </div>
      <div className="text-left postBody my-3">{post.postBody}</div>
      <hr />
      <div>
        <span className="font-weight-bold">{`${post.discount}% `}</span>
        discount on{" "}
        <span className="font-weight-bold">{post.dealItems.toString()}</span>
      </div>
      {post.exceptFor && post.exceptFor.length > 0 && (
        <div>
          Items not included in discount:{" "}
          <span className="font-weight-bold">{post.exceptFor.toString()}</span>
        </div>
      )}
      <div>
        Valid on
        <span className="font-weight-bold ml-2">{post.validOn}</span>
      </div>
      <div className="mb-3">
        Valid Till
        <span className="font-weight-bold ml-2">{post.validTill}</span>
      </div>
    </React.Fragment>
  );
};

export default DealPost;
