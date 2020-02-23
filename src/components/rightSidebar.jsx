import React, { Component } from "react";

class RightSidebar extends Component {
  state = {};

  render() {
    return (
      <div className="fixed">
        <h6 className="text-center right-box">Vote for your favourite</h6>

        <div className="right-box">
          <p>What you like the most?</p>
          <input type="radio" name="choice" />
          <label>Fries</label> <br />
          <input type="radio" name="choice" />
          <label>Burger</label> <br />
          <input type="radio" name="choice" />
          <label>Pizza</label> <br />
          <button className="btn btn-outline-success">Vote</button>
        </div>
      </div>
    );
  }
}

export default RightSidebar;
