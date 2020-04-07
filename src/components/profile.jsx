import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";
import MyProfile from "./myProfile";
import CreatePost from "./createPost";
import Posts from "./posts";
import ProfileNav from "./profileNav";
import ProfileAbout from "./profileAbout";
import ProfileRestaurantVisited from "./profileRestaurantVisited";
import UploadedPhotos from "./uploadedPhotos";
import { getUser } from "../services/userService";

class Profile extends Component {
  state = { active: -1, userProfile: {} };

  async componentDidMount() {
    const id = this.props.location.pathname.substring(6);
    const { data: userProfile } = await getUser(id);
    this.setState({ userProfile });
  }

  render() {
    const { user } = this.props;
    const { userProfile, active } = this.state;

    return (
      <React.Fragment>
        <Navbar user={user} />
        <div className="container my-3">
          <div className="row">
            <div className="col-3">
              <LeftSidebar active={active} />
            </div>
            <div className="col-9">
              <MyProfile
                user={userProfile}
                profile={userProfile._id === user._id ? false : true}
              />

              <ProfileNav />

              <div className="row">
                <div className="col-4 d-flex flex-column">
                  <ProfileAbout />
                  <ProfileRestaurantVisited />
                  <UploadedPhotos />
                </div>
                <div className="col-8">
                  {userProfile._id === user._id && <CreatePost user={user} />}
                  <Posts user={userProfile} profile={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
