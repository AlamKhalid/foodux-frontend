import React from "react";

const Footer = () => {
  return (
    <div className="footer mt-5">
      <div className="container">
        <div className="row pt-5">
          <div className="col-4">
            <div className="text-center mb-3">
              <span
                style={{
                  color: "white",
                  borderLeft: "3px solid white",
                  letterSpacing: "3px",
                  paddingLeft: "10px",
                }}
              >
                USEFUL LINKS
              </span>
            </div>
            <div className="d-flex w-75 justify-content-center ml-4">
              <div className="d-flex flex-column text-white">
                <ul className="footer-ul">
                  <li>Home</li>
                  <li>About</li>
                  <li>Restaurant</li>
                  <li>Food</li>
                  <li>Cities</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-4">
            <label className="text-white">Subscribe to our newsletter</label>
            <input
              type="text"
              className="form-control w-75 mb-2"
              placeholder="Your Email"
            />
            <button className="btn btn-danger mb-2">Subscribe</button>
            <label className="label-2 text-white">
              <em>
                <b>Note:</b> By subscribing to our newsletter, you confirm that
                we can email you promotions unless you unsubscribe.
              </em>
            </label>
          </div>
          <div className="col-4">
            <div className="text-center mb-3">
              <span
                style={{
                  color: "white",
                  borderLeft: "3px solid white",
                  letterSpacing: "3px",
                  paddingLeft: "10px",
                }}
              >
                FOLLOW US ON
              </span>
            </div>
            <div className="text-white text-center">
              <div>
                <i className="fa fa-facebook footer-icon"></i>
                <i className="fa fa-twitter footer-icon"></i>
                <i className="fa fa-google footer-icon"></i>
              </div>
              <div>
                <i className="fa fa-instagram footer-icon"></i>
                <i className="fa fa-pinterest-p footer-icon"></i>
                <i className="fa fa-vimeo footer-icon"></i>
              </div>
              <div>
                <i className="fa fa-medium footer-icon"></i>
                <i className="fa fa-linkedin footer-icon"></i>
                <i className="fa fa-snapchat-ghost footer-icon"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright text-center pt-4 pb-1 text-white">
          © 2020 Copyright. All Rights Reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;
