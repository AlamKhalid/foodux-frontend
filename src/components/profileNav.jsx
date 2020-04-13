import React, { useState } from "react";

const ProfileNav = ({ active, changeNav }) => {
  const [menus] = useState(["About", "Profile", "Followers", "Following"]);

  return (
    <div className="row my-3 mx-1 bg-light profile-nav rounded-lg">
      {menus.map((menu, i) => (
        <div
          key={i}
          onClick={() => changeNav(i)}
          className={`col-3 py-2 text-center profile-item ${
            i === active ? "active-profile-item" : ""
          }`}
        >
          {menu}
        </div>
      ))}
    </div>
  );
};

export default ProfileNav;
