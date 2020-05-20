import React, { useState, useEffect } from "react";
import LandingHeader from "./landingHeader";
import { getCities } from "./../services/cityService";
import Footer from "./footer";
import HomeCard from "./common/homeCard";
import HeadingHome from "./common/headingHome";

const Cities = ({ user }) => {
  const [city, setCity] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: cities } = await getCities();
      setCity(cities);
    }
    getData();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <React.Fragment>
      <LandingHeader user={user} active={4} />
      <img src={require("../icons/city.png")} alt="" className="nav-menu-pic" />
      <div className="container my-5 pt-5">
        <HeadingHome title="Cities" />
        <div className="row mt-4">
          {city.map((c) => (
            <HomeCard title={c.name} label="" img={c.pic} />
          ))}
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default Cities;
