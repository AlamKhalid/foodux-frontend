import React, { Component } from "react";
import LandingHeader from "./landingHeader";
import LandingBody from "./landingBody";

class LandingPage extends Component {
  state = {
    loginForm: true
  };

  handleClick = event => {
    if (event.target.innerHTML === "Login") this.setState({ loginForm: true });
    else this.setState({ loginForm: false });
  };

  render() {
    const { loginForm } = this.state;
    return (
      <React.Fragment>
        <LandingHeader onClick={this.handleClick} loginBtn={loginForm} />
        <LandingBody login={loginForm} />
      </React.Fragment>
    );
  }
}

export default LandingPage;
