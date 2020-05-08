import React from "react";

const SocialIcons = () => {
  return (
    <div className="d-flex flex-row-reverse mx-auto my-3 justify-content-center">
      <i
        className="fa fa-twitter fa-2x pl-5 pointer-cursor"
        style={{ color: "#1DA1F2" }}
      ></i>
      <i
        className="fa fa-google fa-2x px-5 b-right-black pointer-cursor"
        style={{ color: "#C83E31" }}
      ></i>
      <i
        className="fa fa-facebook-f fa-2x pr-5 b-right-black pointer-cursor"
        style={{ color: "#3b5998" }}
      ></i>
    </div>
  );
};

export default SocialIcons;
