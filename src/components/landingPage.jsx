import React from "react";
import LandingHeader from "./landingHeader";
import LandingBody from "./landingBody";

const LandingPage = ({ user }) => {
  return (
    <React.Fragment>
      <LandingHeader user={user} />
      <LandingBody />
    </React.Fragment>
  );
};

export default LandingPage;
