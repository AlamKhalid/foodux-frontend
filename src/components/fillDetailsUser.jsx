import React, { Component } from "react";
import { toast } from "react-toastify";
import { getCities } from "../services/cityService";
import { getFoods } from "../services/foodService";
import { addDetails, getRestaurants } from "../services/userService";

class FillDetailsUser extends Component {
  state = {
    livesIn: "",
    favFood: "",
    favRestaurant: "",
    cities: [],
    foods: [],
    restaurants: [],
    bio: "",
  };

  async componentDidMount() {
    const { data: cities } = await getCities();
    const { data: foods } = await getFoods();
    const { data: restaurants } = await getRestaurants();
    this.setState({ cities, foods, restaurants });
  }

  submitDetails = async (event) => {
    event.preventDefault();
    const { user } = this.props;
    const { livesIn, favFood, favRestaurant, bio } = this.state;
    const response = await addDetails(user._id, {
      bio,
      livesIn,
      favFood,
      favRestaurant,
    });
    if (response) {
      toast("Details added successfully");
      localStorage.setItem("filledDetails", true);
      setTimeout(() => {
        window.location = "/newsfeed";
      }, 2000);
    } else {
      toast.error("Error adding details");
    }
  };

  handleChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  render() {
    const {
      livesIn,
      favFood,
      favRestaurant,
      foods,
      restaurants,
      cities,
      bio,
    } = this.state;

    return (
      <div className="w-25 mx-auto mt-5 pt-5">
        <form method="post" onSubmit={this.submitDetails}>
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            className="form-control mb-3 text-box"
            onChange={this.handleChange}
          />
          <select
            name="livesIn"
            className="form-control text-box mb-3"
            value={livesIn}
            onChange={this.handleChange}
            required
          >
            <option value="">Lives in</option>
            {cities.map((city) => (
              <option key={city._id} value={city._id}>
                {city.name}
              </option>
            ))}
          </select>
          <select
            name="favFood"
            className="form-control text-box mb-3"
            value={favFood}
            onChange={this.handleChange}
            required
          >
            <option value="">Select Favourite Food</option>
            {foods.map((food) => (
              <option key={food._id} value={food._id}>
                {food.name}
              </option>
            ))}
          </select>
          <select
            name="favRestaurant"
            className="form-control text-box mb-3"
            value={favRestaurant}
            onChange={this.handleChange}
            required
          >
            <option value="">Select Favourite Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant._id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          <button className="form-control foodux-btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default FillDetailsUser;
