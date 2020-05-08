import React from "react";
import FillDetailsUser from "./fillDetailsUser";
import FillDetailsRes from "./fillDetailsRes";

const FillDetails = ({ user }) => {
  return user.isRestaurant ? (
    <FillDetailsRes user={user} />
  ) : (
    <FillDetailsUser user={user} />
  );
};

export default FillDetails;
