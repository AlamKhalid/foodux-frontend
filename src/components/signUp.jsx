import React from "react";
import _ from "lodash";
import Form from "./common/form";
import * as userService from "../services/userService";

class SignUp extends Form {
  state = {
    data: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      birthday: {
        date: "none",
        month: "none",
        year: "none"
      },
      gender: ""
    },
    errors: {}
  };

  validate = () => {
    const errors = {};
    const { password, confirmPassword, birthday } = this.state.data;
    const { date, month, year } = birthday;
    if (password !== confirmPassword)
      errors.confirmPassword = "Password did not match";
    if (date === "none" || month === "none" || year === "none")
      errors.birthday = "Birthday is required";
    // if (calculateAge() < 13)
    //   errors.birthday = "You must be atleast 13 years old";
    return Object.keys(errors).length > 0 ? errors : false;
  };

  handleSubmit = async event => {
    event.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    // register the user
    const { year, month, date } = this.state.data.birthday;
    this.state.data.birthday = `${date}-${month}-${year}`;
    const response = await userService.register(
      _.pick(this.state.data, [
        "name",
        "email",
        "password",
        "birthday",
        "gender"
      ])
    );
    if (!response) {
      const errors = {};
      errors.email = "Email already registered";
      this.setState({ errors });
    } else {
      localStorage.setItem("token", response.headers["x-auth-token"]);
      window.location = "/home";
    }
  };

  render() {
    const error = this.state.errors.birthday;
    return (
      <React.Fragment>
        <h1 className="mb-4">Sign Up</h1>
        <form method="post" onSubmit={this.handleSubmit}>
          {this.renderInput("text", "Name", "name")}
          <br />
          {this.renderInput("email", "Email", "email", this.state.errors.email)}
          <br />
          {this.renderInput("password", "New Password", "password")}
          <br />
          {this.renderInput(
            "password",
            "Confirm Password",
            "confirmPassword",
            this.state.errors.confirmPassword
          )}
          <br />
          <h4 className="text-muted">Birthday</h4>
          <div className="row pl-4">
            <div className="col-4 col-lg-3">
              {this.renderSelect("date", "Date")}
            </div>
            <div className="col-4 col-lg-3">
              {this.renderSelect("month", "Month")}
            </div>
            <div className="col-4 col-lg-3">
              {this.renderSelect("year", "Year")}
            </div>
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <br />
          <h4 className="text-muted">Gender</h4>
          {this.renderRadioButton("gender", "female", "Female")}
          {this.renderRadioButton("gender", "male", "Male")}
          <br /> <br />
          {this.renderButton("Sign Up", "signUpBtn")}
        </form>
      </React.Fragment>
    );
  }
}

export default SignUp;
