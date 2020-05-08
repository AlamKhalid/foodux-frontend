import React from "react";
import Login from "./login";
import SocialIcons from "./common/socialIcons";

const LoginPopup = () => {
  return (
    <div
      className="modal fade"
      id="loginForm"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="loginFormTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title w-100 text-center text-uppercase add-spacing ml-4">
              login
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
            <Login />
            <SocialIcons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
