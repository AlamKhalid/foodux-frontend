import React, { useState, useEffect } from "react";
import HeadingHome from "./common/headingHome";
import HomeCard from "./common/homeCard";
import { getFoods } from "./../services/foodService";

const FoodsHome = () => {
  const [food, setFood] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: foo } = await getFoods();
      setFood(foo.slice(0, 3));
    }
    getData();
  }, []);

  return (
    <div className="mt-5 pt-5">
      <HeadingHome title="Foods" />
      <p className="text-center mt-4 px-3 lead">
        So many scrumptious mouth-watering dishes and cuisines
      </p>
      <div className="container mt-5">
        <section className="text-center">
          <div className="row">
            {food.map((f) => (
              <HomeCard
                key={f._id}
                title={f.name}
                label=""
                img={f.profilePic}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default FoodsHome;
