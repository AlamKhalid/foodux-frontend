import React from "react";
import HeadingHome from "./common/headingHome";

const CityHome = () => {
  return (
    <div className="mt-5 pt-5">
      <HeadingHome title="Cities" />
      <p className="text-center mt-4 px-3 lead">
        Reviews available for restaurants in 10+ cities
      </p>
    </div>
  );
};

export default CityHome;
