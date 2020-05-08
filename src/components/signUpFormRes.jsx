import React from "react";
import SignUpRes from "./signUpRes";
import SocialIcons from "./common/socialIcons";

const SignUpPopup = () => {
  return (
    <div
      className="modal fade"
      id="signUpFormRes"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="signUpFormResTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3
              className="modal-title w-100 text-center text-uppercase"
              style={{ letterSpacing: "4px" }}
            >
              sign up as restaurant
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <SignUpRes />
            <SocialIcons />
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
