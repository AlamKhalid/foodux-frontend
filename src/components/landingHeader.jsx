import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import _ from "lodash";
import LoginPopup from "./loginPopup";
import SignUpPopup from "./signUpPopup";
import SignUpOptions from "./signUpOptions";
import SignUpFormRes from "./signUpFormRes";

const LandingHeader = ({ user, isHome = false, active }) => {
  const [navbarClasses, setNavbarClasses] = useState("navbar-transparent");

  useEffect(() => {
    const handleScroll = () => {
      if (document.documentElement.scrollTop <= 10)
        setNavbarClasses("navbar-transparent");
      else setNavbarClasses("navbar-black");
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <React.Fragment>
      <nav
        className={`navbar navbar-expand-lg fixed-top ${
          isHome ? navbarClasses : "navbar-black"
        }`}
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            FooDux
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="fa fa-bars text-white"></span>
          </button>
          <div
            className="collapse navbar-collapse d-lg-flex justify-content-lg-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              <NavLink
                to="/"
                className={`nav-item nav-link mr-3 fit-width ${
                  active === 0 && "b-bot"
                }`}
              >
                Home
              </NavLink>
              <NavLink
                to="/about-us"
                className={`nav-item nav-link mr-3 fit-width ${
                  active === 1 && "b-bot"
                }`}
              >
                About Us
              </NavLink>
              <NavLink
                to="/restaurants"
                className={`nav-item nav-link mr-3 fit-width ${
                  active === 2 && "b-bot"
                }`}
              >
                Restaurants
              </NavLink>
              <NavLink
                to="/foods"
                className={`nav-item nav-link mr-3 fit-width ${
                  active === 3 && "b-bot"
                }`}
              >
                Foods
              </NavLink>
              <NavLink
                to="/cities"
                className={`nav-item nav-link mr-3 fit-width ${
                  active === 4 && "b-bot"
                }`}
              >
                Cities
              </NavLink>
              {!_.isEmpty(user) ? (
                <React.Fragment>
                  <div className="dropdown show fit-width">
                    <NavLink
                      className="nav-item nav-link dropdown-toggle"
                      to="#"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {user.name}
                    </NavLink>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <NavLink className="dropdown-item" to="/newsfeed">
                        <i className="fa fa-newspaper-o mr-2"></i>Newsfeed
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to={`/user/${user._id}`}
                      >
                        {user.isRestaurant ? (
                          <i className="fa fa-university mr-2"></i>
                        ) : (
                          <i className="fa fa-user mr-2"></i>
                        )}
                        Profile
                      </NavLink>
                      <NavLink
                        className="dropdown-item"
                        to={`/user/${user._id}/settings`}
                      >
                        <i className="fa fa-cog mr-2"></i>Settings
                      </NavLink>
                      <div className="dropdown-divider"></div>
                      <NavLink className="dropdown-item" to="/logout">
                        <i className="fa fa-sign-out mr-2"></i>Logout
                      </NavLink>
                    </div>
                  </div>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li>
                    <button
                      className="btn btn-outline-light mr-2"
                      data-toggle="modal"
                      data-target="#loginForm"
                    >
                      Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="btn btn-outline-light"
                      data-toggle="modal"
                      data-target="#signUpOptions"
                    >
                      Sign Up
                    </button>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <LoginPopup />
      <SignUpOptions />
      <SignUpFormRes />
      <SignUpPopup />
    </React.Fragment>
  );
};

export default LandingHeader;
