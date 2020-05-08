import React, { PureComponent } from "react";
import _ from "lodash";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";
import MyProfile from "./myProfile";
import ProfileNavOption from "./profileNavOption";
import ProfileNav from "./profileNav";
import { getUser } from "../services/userService";
import AboutNavOption from "./aboutNavOption";
import FollowersNavOption from "./followersNavOption";
import FollowingNavOption from "./followingNavOption";
import Spinner from "./common/spinner";

class Profile extends PureComponent {
  state = { active: -1, userProfile: {}, navProfileActive: 1 };

  async componentDidMount() {
    const { user } = this.props;
    if (!_.isEmpty(user)) {
      const { data: userProfile } = await getUser(user._id);
      this.setState({ userProfile });
    }
  }

  async componentDidUpdate() {
    const { user } = this.props;
    if (!_.isEmpty(user)) {
      const { data: userProfile } = await getUser(user._id);
      this.setState({ userProfile });
    }
  }

  refreshProfile = async (id) => {
    const { userProfile: user } = this.state;
    if (id === -1) {
      const { data: userProfile } = await getUser(user._id);
      this.setState({ userProfile });
    } else if (id !== user._id) {
      const { data: userProfile } = await getUser(id);
      this.setState({ userProfile, navProfileActive: 1 });
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
        toShow = <AboutNavOption userProfile={userProfile} />;
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
        toShow = (
          <FollowingNavOption
            userProfile={userProfile}
            user={user}
            refreshProfile={this.refreshProfile}
          />
        );
        break;
      default:
    }
    return (
      <React.Fragment>
        {_.isEmpty(user) || _.isEmpty(userProfile) ? (
          <Spinner />
        ) : (
          <React.Fragment>
            <Navbar user={user} refreshProfile={this.refreshProfile} />
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
        )}
      </React.Fragment>
    );
  }
}

export default Profile;
