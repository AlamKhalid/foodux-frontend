import React, { Component } from "react";
import { toast } from "react-toastify";
import { getCities } from "../services/cityService";
import { getFoods } from "../services/foodService";
import { addDetails, getRestaurants } from "../services/userService";
import { storage } from "../firebase/index";

class FillDetailsUser extends Component {
  state = {
    livesIn: "",
    favFood: "",
    favRestaurant: "",
    cities: [],
    foods: [],
    restaurants: [],
    bio: "",
    imageURL: "",
  };

  async componentDidMount() {
    const { data: cities } = await getCities();
    const { data: foods } = await getFoods();
    const { data: restaurants } = await getRestaurants();
    this.setState({ cities, foods, restaurants });
  }

  uploadImage = (image) => {
    const imageName = Date.now() + image.name;
    const uploadTask = storage.ref(`images/${imageName}`).put(image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // progress
      },
      (error) => {
        toast.error("Error uploading picture");
      },
      async () => {
        const url = await storage
          .ref("images")
          .child(imageName)
          .getDownloadURL();
        this.setState({ imageURL: url });
      }
    );
  };

  submitDetails = async (event) => {
    event.preventDefault();
    const { user } = this.props;
    const { livesIn, favFood, favRestaurant, bio, imageURL } = this.state;
    const response = await addDetails(user._id, {
      bio,
      livesIn,
      favFood,
      favRestaurant,
      profilePic: imageURL,
    });
    if (response) {
      toast("Details added successfully");
      localStorage.setItem("filledDetails", true);
      setTimeout(() => {
        window.location = "/newsfeed";
      }, 1000);
    } else {
      toast.error("Error adding details");
    }
  };

  handlePic = ({ target }) => {
    if (target.files[0]) {
      this.uploadImage(target.files[0]);
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
      imageURL,
    } = this.state;

    return (
      <React.Fragment>
        <div className="d-flex w-100 justify-content-center mt-3 mb-4">
          <img
            src={
              imageURL.length > 0 ? imageURL : "https://via.placeholder.com/300"
            }
            alt=""
            width="300"
            height="300"
          />
        </div>
        <div className="w-25 mx-auto">
          <form method="post" onSubmit={this.submitDetails}>
            <div className="custom-file mb-3">
              <input
                type="file"
                className="custom-file-input"
                onChange={this.handlePic}
                required
              />
              <label className="custom-file-label" htmlFor="customFile">
                Upload your profile picture
              </label>
            </div>
            <input
              type="text"
              name="bio"
              placeholder="Bio"
              value={bio}
              className="form-control mb-3 text-box"
              onChange={this.handleChange}
              required
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
      </React.Fragment>
    );
  }
}

export default FillDetailsUser;
