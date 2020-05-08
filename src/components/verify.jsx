import React from "react";
import Verified from "./verified";
import Unverified from "./unverified";

const Verify = ({ user }) => {
  const isVerified = localStorage.getItem("isVerified").length > 0;

  return isVerified ? <Verified user={user} /> : <Unverified />;
};

export default Verify;
