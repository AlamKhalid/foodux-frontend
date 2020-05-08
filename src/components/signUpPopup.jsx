import React from "react";
import SignUp from "./signUp";
import SocialIcons from "./common/socialIcons";

const SignUpPopup = () => {
  return (
    <div
      className="modal fade"
      id="signUpForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="signUpFormTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title w-100 text-center text-uppercase add-spacing ml-5">
              sign up as user
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
            <SignUp />
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
