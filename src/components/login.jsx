import React from "react";
import Form from "./common/form";
import { login } from "../services/authService";
import { toast } from "react-toastify";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: "",
    },
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await login(this.state.data);
    if (!response) {
      toast.error("Invalid Email or Password");
    } else {
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("isLoggedIn", true);
      if (response.data.isVerified && response.data.filledDetails) {
        localStorage.setItem("isVerified", true);
        localStorage.setItem("filledDetails", true);
        window.location = "/newsfeed";
      } else {
        if (response.data.isVerified) localStorage.setItem("isVerified", true);
        else localStorage.setItem("isVerified", "");
        localStorage.setItem("filledDetails", "");
        window.location = "/verify";
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h5 className="mb-4 text-center text-muted">Enter Credentials</h5>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          <br />
          {this.renderInput("password", "Password", "password")}
          <br />
          {this.renderButton("Login")}
        </form>
        <div className="d-flex mt-3">
          <hr className="popup-row" />
          <h6 className="mt-1">OR LOGIN WITH</h6>
          <hr className="popup-row" />
        </div>
      </React.Fragment>
    );
  }
}

export default Login;
