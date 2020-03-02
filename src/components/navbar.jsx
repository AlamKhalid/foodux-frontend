import React, { Component } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";
import SearchBox from "./common/searchBox";

class Navbar extends Component {
  state = {
    sidebarClasses: "d-none"
  };

  componentDidMount() {
    $('[data-toggle-second="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle-second="tooltip"]').on("click", function() {
      $(this).tooltip("hide");
    });
  }

  handleClick = () => {
    const sidebarClasses =
      this.state.sidebarClasses === "d-none" ? "d-lg-none" : "d-none";
    this.setState({ sidebarClasses });
  };

  render() {
    return (
      <React.Fragment>
        <div
          className={`${this.state.sidebarClasses} sidebar shadow-lg bg-light`}
        >
          <div className="mx-4 mt-3 w-100">
            <h3 className="sidebar-brand pb-2">FooDux</h3>
            <SearchBox classes="d-block d-sm-none form-inline my-3" />
            <h6 className="sidebar-item sidebar-item-active">Newsfeed</h6>
            <h6 className="sidebar-item">Food Blog</h6>
            <h6 className="sidebar-item">Deals & Discounts</h6>
            <h6 className="sidebar-item d-block d-md-none">Polling</h6>
          </div>
        </div>
        <nav className="navbar sticky-top navbar-expand navbar-light">
          <div className="container-fluid container-lg">
            <div className="d-flex">
              <NavLink className="d-none d-lg-block initial mr-3" to="/home">
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
                  to="/home"
                  data-toggle-second="tooltip"
                  data-placement="bottom"
                  title="Newsfeed"
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link b-right py-0 px-1 px-sm-3"
                  to={`/user/${this.props.user._id}`}
                  data-toggle-second="tooltip"
                  data-placement="bottom"
                  title="Profile"
                >
                  {this.props.user.name || "Name"}
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
                  <NavLink className="dropdown-item" to="/user/:id/settings">
                    <i className="fa fa-cog mr-2"></i>Settings
                  </NavLink>
                  <NavLink className="dropdown-item" to="/user/:id/problem">
                    <i className="fa fa-question-circle mr-2"></i>Report a
                    Problem
                  </NavLink>
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
