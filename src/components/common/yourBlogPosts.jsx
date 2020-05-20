import React from "react";

const YourBlogPosts = () => {
  return (
    <div className="card mb-4">
      <img
        className="card-img-top"
        src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
        alt=""
      />
      <div className="card-body">
        <h5 className="card-title mb-0">Title</h5>
        <p className="card-text mt-2 label-2">
          <span>Posted on:</span>
          <br />
          some body
        </p>
      </div>
    </div>
  );
};

export default YourBlogPosts;
