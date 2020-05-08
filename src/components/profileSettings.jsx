import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateProfileSettings } from "./../services/userService";

const ProfileSettings = ({ user, cities, restaurants, foods, setUser }) => {
  const [bio, setBio] = useState(user.bio);
  const [livesIn, setLivesIn] = useState(user.livesIn._id);
  const [favRes, setFavRes] = useState(user.favRestaurant._id);
  const [favFood, setFavFood] = useState(user.favFood._id);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (
      user.bio !== bio.trim() ||
      user.livesIn._id !== livesIn ||
      user.favRestaurant._id !== favRes ||
      user.favFood._id !== favFood
    )
      setDisableBtn(false);
    else setDisableBtn(true);
  }, [user, livesIn, favRes, favFood, bio]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await updateProfileSettings(user._id, {
      livesIn,
      favFood,
      bio,
      favRestaurant: favRes,
    });
    if (response) {
      setUser(response);
      toast("Settings saved");
    } else {
      toast.error("Error updating profile");
    }
  };

  return (
    <div
      id="collapseTwo"
      className="collapse"
      aria-labelledby="profile-settings"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <label htmlFor="bio" className="label-1 w-15">
            Bio
          </label>
          <input
            type="text"
            className="form-control text-box w-50 d-inline"
            value={bio}
            onChange={({ target }) => setBio(target.value)}
            required
          />
          <br /> <br />
          <label htmlFor="lives-in" className="label-1 w-15">
            Lives In
          </label>
          <select
            className="form-control text-box w-50 d-inline"
            value={livesIn}
            onChange={({ target }) => setLivesIn(target.value)}
            required
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
          <br /> <br />
          <label htmlFor="fav-res" className="label-1 w-15">
            Fav Restaurant
          </label>
          <select
            className="form-control text-box w-50 d-inline"
            value={favRes}
            onChange={({ target }) => setFavRes(target.value)}
            required
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <br /> <br />
          <label htmlFor="fav-food" className="label-1 w-15">
            Fav Food
          </label>
          <select
            className="form-control text-box w-50 d-inline"
            value={favFood}
            onChange={({ target }) => setFavFood(target.value)}
            required
          >
            <option value="">Select Restaurant</option>
            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
          </select>
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
