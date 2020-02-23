import React, { Component } from "react";
import Post from "./common/post";

class Posts extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <Post />
        <Post />
      </React.Fragment>
    );
  }
}

export default Posts;
