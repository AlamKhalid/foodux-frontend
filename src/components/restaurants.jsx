import React, { useState, useEffect } from "react";
import LandingHeader from "./landingHeader";
import HeadingHome from "./common/headingHome";
import HomeCard from "./common/homeCard";
import Footer from "./footer";
import { getRestaurants } from "../services/userService";

const Restaurants = ({ user }) => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: ress } = await getRestaurants();
      setRes(ress);
    }
    getData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <React.Fragment>
      <LandingHeader user={user} active={2} />
      <img src={require("../icons/res.png")} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Restaurants" />
        <div className="row mt-4">
          {res.map((r) => (
            <HomeCard title={r.name} label="" img={r.profilePic} />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Restaurants;
