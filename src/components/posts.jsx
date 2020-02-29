import React, { Component } from "react";
import Post from "./common/post";
import { getPosts } from "../services/postService";
import { getAllLikedPosts } from "../services/likeService";

class Posts extends Component {
  state = {
    posts: [],
    likedPosts: []
  };

  async componentDidMount() {
    const { data: posts } = await getPosts();
    const { data: likedPosts } = await getAllLikedPosts(this.props.user._id);
    this.setState({ posts, likedPosts });
  }

  render() {
    const { posts, likedPosts } = this.state;

    return (
      <React.Fragment>
        {posts.map(post => (
          <Post
            key={post._id}
            post={post}
            userId={this.props.user._id}
            liked={likedPosts.indexOf(post._id) > -1 ? true : false}
          />
        ))}
      </React.Fragment>
    );
  }
}

export default Posts;
