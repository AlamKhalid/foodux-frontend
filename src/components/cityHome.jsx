import React, { useState, useEffect } from "react";
import HeadingHome from "./common/headingHome";
import HomeCard from "./common/homeCard";
import { getCities } from "./../services/cityService";

const CityHome = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: city } = await getCities();
      setCities(city.slice(0, 3));
    }
    getData();
  }, []);
  return (
    <div className="mt-5 pt-5">
      <HeadingHome title="Cities" />
      <p className="text-center mt-4 px-3 lead">
        Reviews available for restaurants in 10+ cities
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {cities.map((c) => (
              <HomeCard
                key={c._id}
                title={c.name}
                label=""
                img={c.profilePic || c.pic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CityHome;
