import React, { useState, useEffect } from "react";
import HeadingHome from "./common/headingHome";
import HomeCard from "./common/homeCard";
import { getRestaurants } from "../services/userService";

const RestaurantsHome = () => {
  const [res, setRes] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: restaurant } = await getRestaurants();
      setRes(restaurant.slice(0, 3));
    }
    getData();
  }, []);
  return (
    <div className="mt-5 pt-5">
      <HeadingHome title="Restaurants" />
      <p className="text-center mt-4 px-3 lead">
        Enjoy your favourite meal with over 100+ restaurants along with
        exclusive deals
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {res.map((r) => (
              <HomeCard
                key={r._id}
                title={r.name}
                label=""
                img={r.profilePic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RestaurantsHome;
