import React, { Component } from "react";
import Post from "./common/post";
import { getAllLikedPosts } from "../services/likeService";
import { getHiddenPosts } from "../services/userService";
import { getPosts } from "../services/postService";
import { getAllUserPosts } from "./../services/userService";

class Posts extends Component {
  state = {
    posts: [],
    likedPosts: [],
    hiddenPosts: [],
    userPosts: [],
  };

  async componentDidMount() {
    const { userId, profile } = this.props;
    const { data: posts } = await getPosts();
    const { data: hiddenPosts } = await getHiddenPosts(userId);
    const { data: likedPosts } = await getAllLikedPosts(userId);
    let userPosts = [];
    if (profile) {
      const { data } = await getAllUserPosts(userId);
      userPosts = data;
    }
    this.setState({ posts, likedPosts, hiddenPosts, userPosts });
  }

  reRenderPosts = async () => {
    const { userId } = this.props;
    const { data: posts } = await getPosts();
    const { data: hiddenPosts } = await getHiddenPosts(userId);
    const { data: likedPosts } = await getAllLikedPosts(userId);
    this.setState({ posts, likedPosts, hiddenPosts });
  };

  render() {
    let { posts, likedPosts, hiddenPosts, userPosts } = this.state;
    const { profile, userId } = this.props;
    posts = posts.filter((post) => hiddenPosts.indexOf(post._id) === -1);

    if (profile) {
      posts = posts.filter((post) => userPosts.indexOf(post._id) > -1);
    }

    return (
      <React.Fragment>
        {posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              post={post}
              userId={userId}
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
