import React, { useEffect } from "react";
import $ from "jquery";
import UserAbout from "./userAbout";
import ResAbout from "./resAbout";

const AboutNavOption = ({ userProfile }) => {
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
  });

  return userProfile.isRestaurant ? (
    <ResAbout userProfile={userProfile} />
  ) : (
    <UserAbout userProfile={userProfile} />
  );
};

export default AboutNavOption;
