import React from "react";
import ReactHtmlParser from "react-html-parser";

const YourBlogPosts = ({ post }) => {
  return (
    <div className="card mb-4">
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
        <h5 className="card-title mb-0">{post.title}</h5>
        <div className="card-text mt-0">
          <span className="label-2 text-muted">Posted on: {post.date}</span>
          <hr />
          {ReactHtmlParser(post.body, {
            transform: (node) => {
              if (node.name === "img") {
                return null;
              }
            },
          })}
        </div>
      </div>
    </div>
  );
};

export default YourBlogPosts;
