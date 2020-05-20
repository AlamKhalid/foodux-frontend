import React, { useEffect } from "react";
import LandingHeader from "./landingHeader";
import LandingBody from "./landingBody";

const LandingPage = ({ user }) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
  return (
    <React.Fragment>
      <LandingHeader user={user} isHome={true} active={0} />
      <LandingBody />
    </React.Fragment>
  );
};

export default LandingPage;
