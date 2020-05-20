import React, { Component } from "react";
import Post from "./common/post";
import { getAllLikedPosts } from "../services/likeService";
import { getHiddenPosts, getAllUserPosts } from "../services/userService";
import { getPosts } from "../services/postService";

class Posts extends Component {
  state = {
    posts: [],
    likedPosts: [],
    hiddenPosts: [],
    userPosts: [],
  };

  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.userId !== nextProps.userId ||
      this.props.profile !== nextProps.profile ||
      this.state.posts !== nextState.posts ||
      this.state.hiddenPosts !== nextState.hiddenPosts ||
      this.state.userPosts !== nextState.userPosts
    )
      return true;
    return false;
  }

  getData = async () => {
    const { user, profile } = this.props;
    const { data: posts } = await getPosts();
    const { data: hiddenPosts } = await getHiddenPosts(user._id);
    const { data: likedPosts } = await getAllLikedPosts(user._id);
    let userPosts = [];
    if (profile) {
      const { data } = await getAllUserPosts(user._id);
      userPosts = data;
    }
    this.setState({
      posts,
      likedPosts,
      hiddenPosts,
      userPosts,
    });
  };

  componentDidUpdate() {
    this.getData();
  }

  componentDidMount() {
    this.getData();
  }

  reRenderPosts = async () => {
    const { user } = this.props;
    const { data: posts } = await getPosts();
    const { data: hiddenPosts } = await getHiddenPosts(user._id);
    const { data: likedPosts } = await getAllLikedPosts(user._id);
    this.setState({ posts, likedPosts, hiddenPosts });
  };

  render() {
    let { posts, likedPosts, hiddenPosts, userPosts } = this.state;
    const { profile, user } = this.props;
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
              user={user}
              liked={likedPosts.indexOf(post._id) > -1 ? true : false}
              reRenderPosts={this.reRenderPosts}
              profile={profile}
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
