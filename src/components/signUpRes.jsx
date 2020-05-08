import React from "react";
import { toast } from "react-toastify";
import _ from "lodash";
import Form from "./common/form";
import { register } from "../services/userService";

class SignUpRes extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      website: "",
      isRestaurant: true,
    },
  };

  validate = () => {
    const { password, confirmPassword } = this.state.data;

    if (password !== confirmPassword) {
      toast.error("Password did not match");
      return true;
    }
    return false;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    console.log("wow");
    const errors = this.validate();
    if (errors) return;
    // register the restaurant
    const response = await register(
      _.pick(this.state.data, [
        "name",
        "email",
        "password",
        "website",
        "isRestaurant",
      ])
    );
    if (!response) {
      toast.error("Email already registered");
    } else {
      localStorage.setItem("token", response.headers["x-auth-token"]);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("isVerified", "");
      localStorage.setItem("filledDetails", "");
      window.location = "/verify";
    }
  };

  render() {
    return (
      <React.Fragment>
        <h5 className="mb-4 text-center text-muted">Enter Credentials</h5>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("text", "Restaurant's Name", "name")}
          <br />
          {this.renderInput("email", "Restaurant's Email", "email")}
          <br />
          {this.renderInput("password", "New Password", "password")}
          <br />
          {this.renderInput("password", "Confirm Password", "confirmPassword")}
          <br />
          {this.renderInput("url", "Restaurant's Website", "website")}
          <br />
          {this.renderButton("Sign Up")}
        </form>
        <div className="d-flex mt-3">
          <hr className="popup-row" />
          <h6 className="mt-1">OR SIGN UP WITH</h6>
          <hr className="popup-row" />
        </div>
      </React.Fragment>
    );
  }
}

export default SignUpRes;
