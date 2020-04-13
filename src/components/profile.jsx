import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";
import MyProfile from "./myProfile";
import ProfileNavOption from "./profileNavOption";
import ProfileNav from "./profileNav";
import { getUser } from "../services/userService";
import AboutNavOption from "./aboutNavOption";
import FollowersNavOption from "./followersNavOption";
import FollowingNavOption from "./followingNavOption";

class Profile extends Component {
  state = { active: -1, userProfile: {}, navProfileActive: 1 };

  async componentDidMount() {
    const id = this.props.location.pathname.substring(6);
    const { data: userProfile } = await getUser(id);
    this.setState({ userProfile });
  }

  refreshProfile = async (id) => {
    if (id !== this.state.userProfile._id) {
      const { data: userProfile } = await getUser(id);
      this.setState({ userProfile, navProfileActive: 1 });
    } else {
      this.setState({ navProfileActive: 1 });
    }
  };

  changeNav = (index) => {
    this.setState({ navProfileActive: index });
  };

  render() {
    const { user } = this.props;
    const { userProfile, active, navProfileActive } = this.state;
    let toShow;

    switch (navProfileActive) {
      case 0:
        toShow = <AboutNavOption />;
        break;
      case 1:
        toShow = <ProfileNavOption userProfile={userProfile} user={user} />;
        break;
      case 2:
        toShow = (
          <FollowersNavOption
            userProfile={userProfile}
            user={user}
            refreshProfile={this.refreshProfile}
          />
        );
        break;
      case 3:
        toShow = <FollowingNavOption userProfile={userProfile} user={user} />;
        break;
      default:
    }

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
                userProfile={userProfile}
                user={user}
                profile={userProfile._id === user._id ? false : true}
              />

              <ProfileNav
                active={navProfileActive}
                changeNav={this.changeNav}
              />

              {toShow}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
