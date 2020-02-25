import React, { Component } from "react";
import $ from "jquery";
import { NavLink } from "react-router-dom";

class Navbar extends Component {
  state = {};

  componentDidMount() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  handleClick = () => {};

  render() {
    return (
      <nav className="navbar sticky-top navbar-expand navbar-light">
        <div className="container-fluid container-lg">
          <div className="d-flex">
            <NavLink className="d-none d-lg-block initial mr-3" to="/home">
              FD
            </NavLink>
            <button
              className="d-block d-lg-none btn btn-outline-light mr-3"
              onClick={this.handleClick}
            >
              <i className="fa fa-bars"></i>
            </button>
            <input type="text" className="d-md-none expand search-icon" />
            <form className="d-none d-md-block form-inline mt-1">
              <input type="text" className="searchBox" placeholder="Search" />
              <button type="submit" className="searchBtn">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link b-right"
                to="/home"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Newsfeed"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link b-right"
                id="profileLink"
                to="/user/:id"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Profile"
              >
                {this.props.user.name || "Name"}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link b-right"
                to="/user/:id/activity"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Recent Activity"
              >
                Notifications
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              ></NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <NavLink className="dropdown-item" to="/user/:id/settings">
                  <i className="fa fa-cog mr-2"></i>Settings
                </NavLink>
                <NavLink className="dropdown-item" to="/user/:id/problem">
                  <i className="fa fa-question-circle mr-2"></i>Report a Problem
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
    );
  }
}

export default Navbar;
