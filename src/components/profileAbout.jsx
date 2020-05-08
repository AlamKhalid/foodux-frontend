import React, { Component } from "react";
import Branches from "./common/branches";

class ProfileAbout extends Component {
  state = {
    editBioClass: "d-none",
  };

  showEdit = () => {
    this.setState({ editBioClass: "" });
  };

  hideEdit = () => {
    this.setState({ editBioClass: "d-none" });
  };

  render() {
    const { editBioClass } = this.state;
    const { userProfile } = this.props;

    return (
      <div className="bg-light rounded-lg p-3">
        {userProfile.isRestaurant ? (
          <React.Fragment>
            <div>
              <span className="font-weight-bold">Menu </span>
              <span className="foodux-link">
                {userProfile.serves.map((s) => s.name).toString()}
              </span>
            </div>
            <div>
              <span className="font-weight-bold">Phone </span>
              <span className="foodux-link">{userProfile.phone}</span>
            </div>
            <div>
              <span className="font-weight-bold">Restaurant Type </span>
              <span className="foodux-link">
                {userProfile.type.map((t) => t.name).toString()}
              </span>
            </div>
            <hr />
            <div>
              <span className="font-weight-bold mb-2">Branches</span>
            </div>
            {userProfile.branches.map((branch) => (
              <Branches key={branch._id} branch={branch} />
            ))}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="text-justify"
              onMouseEnter={this.showEdit}
              onMouseLeave={this.hideEdit}
            >
              {userProfile.bio}
              <i className={`fa fa-pencil  ml-3 mt-1 ${editBioClass}`}></i>
            </div>
            <hr />
            <div>
              <span className="font-weight-bold">Lives in </span>
              <span className="foodux-link">{userProfile.livesIn.name}</span>
            </div>
            <div>
              <span className="font-weight-bold">Fav Food </span>
              <span className="foodux-link">{userProfile.favFood.name}</span>
            </div>
            <div>
              <span className="font-weight-bold">Fav Restaurant </span>
              <span className="foodux-link">
                {userProfile.favRestaurant.name}
              </span>
            </div>
            <div>
              <span className="font-weight-bold">Joined on </span>
              <span className="foodux-link">{userProfile.joinedOn}</span>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default ProfileAbout;
