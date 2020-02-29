import React, { Component } from "react";

class SearchBox extends Component {
  state = {};
  render() {
    return (
      <form className={this.props.classes}>
        <input type="text" className="searchBox" placeholder="Search" />
        <button type="submit" className="searchBtn">
          <i className="fa fa-search"></i>
        </button>
      </form>
    );
  }
}

export default SearchBox;
