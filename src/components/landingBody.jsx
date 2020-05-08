import React from "react";
import ImageSlider from "./imageSlider";
import AboutHome from "./aboutHome";
import RestaurantsHome from "./restaurantsHome";
import FoodsHome from "./foodsHome";
import CityHome from "./cityHome";
import Footer from "./footer";

const LandingBody = () => {
  return (
    <React.Fragment>
      <ImageSlider />
      <div className="container mt-5">
        <AboutHome />
        <RestaurantsHome />
        <FoodsHome />
        <CityHome />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default LandingBody;
