import React, { Component } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Navbar extends Component {
  state = {
    sidebarClasses: "d-none",
  };

  componentDidMount() {
    $('[data-toggle-second="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle-second="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
  }

  handleClick = () => {
    const sidebarClasses =
      this.state.sidebarClasses === "d-none" ? "d-lg-none" : "d-none";
    this.setState({ sidebarClasses });
  };

  render() {
    const { user, refreshProfile } = this.props;
    const { sidebarClasses } = this.state;

    return (
      <React.Fragment>
        <div className={`${sidebarClasses} sidebar shadow-lg bg-light`}>
          <div className="mx-4 mt-3 w-100">
            <h3
              className="sidebar-brand pb-2"
              onClick={() => (window.location = "/")}
            >
              FooDux
            </h3>
            <SearchBox classes="d-block d-sm-none form-inline my-3" />
            <NavLink
              to="/newsfeed"
              className="sidebar-item sidebar-item-active"
            >
              Newsfeed
            </NavLink>
            <NavLink to="/foodblog" className="sidebar-item">
              Food Blog
            </NavLink>
            <NavLink to="/deals-and-discounts" className="sidebar-item">
              Deals & Discounts
            </NavLink>
          </div>
        </div>
        <nav className="navbar sticky-top navbar-expand navbar-black">
          <div className="container-fluid container-lg">
            <div className="d-flex">
              <NavLink className="d-none d-lg-block initial mr-3" to="/">
                FD
              </NavLink>
              <button
                className="d-lg-none btn btn-outline-light mr-3"
                onClick={this.handleClick}
              >
                <i className="fa fa-bars"></i>
              </button>
              <input
                type="text"
                className="d-none d-sm-block d-md-none expand search-icon my-auto"
              />
              <SearchBox classes="d-none d-md-block form-inline mt-1" />
            </div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link b-right py-0 px-1 px-sm-3"
                  to="/newsfeed"
                  data-toggle-second="tooltip"
                  data-placement="bottom"
                  title="Newsfeed"
                >
                  Newsfeed
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link b-right py-0 px-1 px-sm-3"
                  to={
                    user.isRestaurant
                      ? `/restaurant/${user._id}`
                      : `/user/${user._id}`
                  }
                  data-toggle-second="tooltip"
                  data-placement="bottom"
                  title="Profile"
                  onClick={() => {
                    if (refreshProfile) refreshProfile(user._id);
                  }}
                >
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link b-right py-0 px-1 px-sm-3"
                  to="#"
                  role="button"
                  id="notifications"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-toggle-second="tooltip"
                  data-placement="bottom"
                  title="Recent Activity"
                >
                  Notifications
                </NavLink>
                <div className="dropdown-menu" aria-labelledby="notifications">
                  <span className="dropdown-item">1 Notifications</span>
                </div>
              </li>
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle py-0 px-1 px-sm-3"
                  to="#"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                ></NavLink>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdown"
                >
                  <NavLink
                    className="dropdown-item"
                    to={
                      user.isRestaurant
                        ? `/restaurant/${user._id}/settings`
                        : `/user/${user._id}/settings`
                    }
                  >
                    <i className="fa fa-cog mr-2"></i>Settings
                  </NavLink>
                  {user.isEditor && (
                    <NavLink className="dropdown-item" to="/editor">
                      <i className="fa fa-pencil mr-2"></i>Editor
                    </NavLink>
                  )}
                  <div className="dropdown-divider"></div>
                  <NavLink className="dropdown-item" to="/logout">
                    <i className="fa fa-sign-out mr-2"></i>Logout
                  </NavLink>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default Navbar;
