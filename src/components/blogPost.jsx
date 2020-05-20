import React from "react";
import ReactHtmlParser from "react-html-parser";

const BlogPost = ({ post }) => {
  return (
    <div className="card" style={{ maxWidth: "30%" }}>
      <img
        className="card-img-top"
        src={
          post.img
            ? post.img
            : "https://res.cloudinary.com/blogpedia/image/upload/default.png"
        }
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title mb-1 pb-0">{post.title}</h5>
        <p className="mt-0 pt-0 text-muted label-2">
          Written by {post.postedBy.name}
        </p>
        <div className="card-text">
          {ReactHtmlParser(post.body, {
            transform: (node) => {
              if (node.name === "img") {
                return null;
              }
            },
          })}
          <span className="foodux-link font-weight-bolder">Show more...</span>
        </div>
      </div>
      <div className="card-footer">
        <small className="text-muted">Posted on {post.date}</small>
      </div>
    </div>
  );
};

export default BlogPost;
