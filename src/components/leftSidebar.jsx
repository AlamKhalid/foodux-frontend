import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getCategories } from "./../services/categories";

const LeftSidebar = ({ active }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: categories } = await getCategories();
      setCategories(categories);
    }
    getData();
  }, []);

  return (
    <div className="list-group fixed">
      {categories.map((category) => (
        <NavLink
          to={category.to}
          className={
            "list-group-item list-group-item-action" +
            (active !== -1 && category._id === categories[active]._id
              ? " active-side"
              : "")
          }
          key={category._id}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
};

export default LeftSidebar;
