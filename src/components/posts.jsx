import React, { Component } from "react";
import Post from "./common/post";
import { getPosts } from "../services/postService";

class Posts extends Component {
  state = {
    posts: []
  };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    this.setState({ posts });
  }

  render() {
    const { posts } = this.state;

    return (
      <React.Fragment>
        {posts.map(post => (
          <Post key={post._id} post={post} userId={this.props.user._id} />
        ))}
      </React.Fragment>
    );
  }
}

export default Posts;
