import React from "react";

const HeadingHome = ({ title }) => {
  return (
    <div className="d-flex mx-auto">
      <hr className="home-hr" />
      <h1 className="text-capitalize w-25 text-center">{title}</h1>
      <hr className="home-hr" />
    </div>
  );
};

export default HeadingHome;
