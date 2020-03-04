import React, { Component } from "react";
import LeftSidebar from "./leftSidebar";
import Navbar from "./navbar";
import MyProfile from "./myProfile";
import CreatePost from "./createPost";
import Posts from "./posts";
import { getUser } from "../services/userService";

class Profile extends Component {
  state = { active: -1, user: {} };

  async componentDidMount() {
    const { data: user } = await getUser(this.props.user._id);
    this.setState({ user });
  }

  render() {
    const { user } = this.props;

    return (
      <React.Fragment>
        <Navbar user={user} />
        <div className="container my-3">
          <div className="row">
            <div className="col-3">
              <LeftSidebar active={this.state.active} />
            </div>
            <div className="col-9">
              <MyProfile user={this.state.user} />
              <CreatePost user={user} />
              <Posts user={user} profile={true} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Profile;
