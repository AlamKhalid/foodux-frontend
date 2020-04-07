import React, { Component } from "react";

class ProfileRestaurantVisited extends Component {
  state = {};
  render() {
    return (
      <div className="bg-light rounded-lg my-3 p-3">
        <h6>Restaurants Visited</h6> <hr />
        <div className="row text-center">
          <div className="col-6">Pizza Hut</div>
          <div className="col-6">Domino</div>
        </div>
      </div>
    );
  }
}

export default ProfileRestaurantVisited;
