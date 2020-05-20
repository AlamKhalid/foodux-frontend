import React, { useState, useEffect } from "react";
import LandingHeader from "./landingHeader";
import { getFoods } from "./../services/foodService";
import HomeCard from "./common/homeCard";
import Footer from "./footer";
import HeadingHome from "./common/headingHome";

const Foods = ({ user }) => {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: food } = await getFoods();
      setFoods(food);
    }
    getData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <React.Fragment>
      <LandingHeader user={user} active={3} />
      <img src={require("../icons/food.png")} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Foods" />
        <div className="row mt-4">
          {foods.map((f) => (
            <HomeCard title={f.name} label="" img={f.profilePic} />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Foods;
