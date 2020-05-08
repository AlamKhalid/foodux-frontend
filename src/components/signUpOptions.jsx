import React from "react";

const SignUpPopup = () => {
  return (
    <div
      className="modal fade"
      id="signUpOptions"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="signUpOptionsTitle"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title w-100 text-center text-uppercase add-spacing ml-4">
              choose option
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
          <div className="modal-body d-flex justify-content-around">
            <button
              className="btn foodux-btn"
              data-dismiss="modal"
              aria-label="Close"
              data-toggle="modal"
              data-target="#signUpForm"
            >
              Sign Up as User <i className="fa fa-user"></i>
            </button>
            <button
              className="btn foodux-btn"
              data-dismiss="modal"
              aria-label="Close"
              data-toggle="modal"
              data-target="#signUpFormRes"
            >
              Sign Up as Restaurant <i className="fa fa-bank"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPopup;
