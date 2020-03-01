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

  reRenderPosts = async () => {
    const { data: posts } = await getPosts();
    const { data: likedPosts } = await getAllLikedPosts(this.props.user._id);
    this.setState({ posts, likedPosts });
  };

  render() {
    const { posts, likedPosts } = this.state;

    return (
      <React.Fragment>
        {posts.length > 0 ? (
          posts.map(post => (
            <Post
              key={post._id}
              post={post}
              userId={this.props.user._id}
              liked={likedPosts.indexOf(post._id) > -1 ? true : false}
              reRenderPosts={this.reRenderPosts}
            />
          ))
        ) : (
          <p className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg text-center text-muted">
            No posts to show
          </p>
        )}
      </React.Fragment>
    );
  }
}

export default Posts;
