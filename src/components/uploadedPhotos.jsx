import React, { Component } from "react";

class UploadedPhotos extends Component {
  state = {};
  render() {
    return (
      <div className="bg-light rounded-lg p-3">
        <h6>Photos</h6> <hr />
        <div className="row">
          <div className="col-6">1</div>
          <div className="col-6">2</div>
        </div>
      </div>
    );
  }
}

export default UploadedPhotos;
