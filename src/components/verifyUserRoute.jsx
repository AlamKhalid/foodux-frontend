import { Component } from "react";
import jwtDecode from "jwt-decode";
import { verifyUser } from "../services/userService";
import { verifyRestaurant } from "../services/restaurantService";

class VerifyUserRoute extends Component {
  async componentDidMount() {
    const jwt = localStorage.getItem("token");
    const user = jwtDecode(jwt);
    if (user.isRestaurant) await verifyRestaurant(user._id);
    else await verifyUser(user._id);
    localStorage.setItem("isVerified", true);
    window.location = "/verify";
  }

  render() {
    return null;
  }
}

export default VerifyUserRoute;
