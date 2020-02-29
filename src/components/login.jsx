import React from "react";
import Form from "./common/form";
import { login } from "../services/authService";
import { toast } from "react-toastify";

class Login extends Form {
  state = {
    data: {
      email: "",
      password: ""
    }
  };

  handleSubmit = async event => {
    event.preventDefault();
    const response = await login(this.state.data);
    if (!response) {
      toast.error("Invalid Email or Password");
    } else {
      const jwt = response.data;
      localStorage.setItem("token", jwt);
      window.location = "/home";
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="mb-4">Login</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          <br />
          {this.renderInput("password", "Password", "password")}
          <br />
          {this.renderButton("Login", "loginBtn")}
        </form>
      </React.Fragment>
    );
  }
}

export default Login;
