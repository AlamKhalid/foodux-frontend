import React, { Component } from "react";

class ProfileAbout extends Component {
  state = {
    editBioClass: "d-none"
  };

  showEdit = () => {
    this.setState({ editBioClass: "" });
  };

  hideEdit = () => {
    this.setState({ editBioClass: "d-none" });
  };

  render() {
    const { editBioClass } = this.state;

    return (
      <div className="bg-light rounded-lg p-3">
        <div
          className="text-justify"
          onMouseEnter={this.showEdit}
          onMouseLeave={this.hideEdit}
        >
          Some bio
          <i className={`fa fa-pencil  ml-3 mt-1 ${editBioClass}`}></i>
        </div>
        <hr />
        <div>
          <span className="font-weight-bold">Lives in </span>
          <span className="foodux-link">Islamabad</span>
        </div>
        <div>
          <span className="font-weight-bold">Fav Food </span>
          <span className="foodux-link">Steaks</span>
        </div>
        <div>
          <span className="font-weight-bold">Fav Restaurant </span>
          <span className="foodux-link">Ranchers</span>
        </div>
        <div>
          <span className="font-weight-bold">Blog Level </span>
          <span className="foodux-link">Beginner</span>
        </div>
      </div>
    );
  }
}

export default ProfileAbout;
