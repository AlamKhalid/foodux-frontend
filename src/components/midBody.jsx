import React, { Component } from "react";
import CreatePost from "./createPost";
import Posts from "./posts";

class MidBody extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <CreatePost user={this.props.user} />
        <Posts user={this.props.user} />
      </React.Fragment>
    );
  }
}

export default MidBody;
