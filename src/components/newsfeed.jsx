import React, { Component } from "react";
import CreatePost from "./createPost";
import Posts from "./posts";

class Newsfeed extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <CreatePost user={this.props.user} />
        <Posts user={this.props.user} profile={false} />
      </React.Fragment>
    );
  }
}

export default Newsfeed;
