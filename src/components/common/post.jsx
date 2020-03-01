import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import Comment from "./comment";
import AddComment from "./addComment";
import PostButtons from "./postButtons";
import PostOptions from "./postOptions";
import { getPost } from "../../services/postService";

class Post extends Component {
  state = {
    comments: [], // stores the comments array on a single post
    likes: [] // stores the likes array for a single post
  };

  componentDidMount() {
    // updates the state with the props passed to this component
    const { comments, likes } = this.props.post;
    this.setState({ comments, likes });
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  reRenderPost = async () => {
    // re-render the post if a user either likes it or comments on it to show real-time changes
    const { data: post } = await getPost(this.props.post._id);
    this.setState({ comments: post.comments, likes: post.likes });
  };

  // function to get the names of all likers of a post, to show them as tooltip
  getLikesName = () => {
    const { likes } = this.state;
    let likers = "",
      counter = 0;
    // only shows 5 likers, rest remaining as numbers
    this.state.likes.forEach(function(like) {
      if (counter < 5) {
        likers += like.name + "<br/>";
        counter++;
      }
    });
    if (likes.length > 5) likers += "and" + (likes.length - 5) + " more...";
    return likers;
  };

  // function to get the names of all commentators of a post, to show them as tooltip
  getCommentsName = () => {
    const { comments } = this.state || [];
    let commentators = "",
      ids = [],
      counter = 0;
    // only shows 5 commentators, rest remaining as numbers
    comments.forEach(function(comment) {
      // show unique commentators names, by matching the ids
      if (ids.indexOf(comment.commentBy._id) === -1 && counter < 5) {
        commentators += comment.commentBy.name + "<br/>";
        ids.push(comment.commentBy._id);
        counter++;
      }
    });
    if (comments.length > 5 && counter >= 5)
      commentators += "and " + (comments.length - 5) + " more...";
    return commentators;
  };

  render() {
    // destructuring the props and state objects
    const { post, userId, liked } = this.props;
    const { comments, likes } = this.state;
    const likers = this.getLikesName();
    const commentators = this.getCommentsName();

    return (
      <div className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              className="displayPostPicture"
              src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
              alt=""
            />
            <div className="d-flex flex-column align-items-start">
              <NavLink className="userName" to="/">
                {post.postBy.name}
              </NavLink>
              <div className="d-flex justify-content-between">
                <span className="mr-3 postDetails text-muted">
                  <i className="fa fa-user"></i>
                </span>
                <span className="text-muted postDetails mr-3">
                  <i className="fa fa-clock-o mr-1"></i>
                  {post.time}
                </span>
                <span className="mr-3 postDetails text-muted">
                  <i className="fa fa-map-marker mr-1"></i>
                  {post.location}
                </span>
                <span className="postDetails text-muted">
                  <i className="fa fa-money mr-1"></i>
                  {post.amountSpend}
                </span>
              </div>
            </div>
          </div>
          <PostOptions
            postBy={post.postBy}
            userId={userId}
            postId={post._id}
            reRenderPosts={this.props.reRenderPosts}
          />
        </div>
        <div className="text-left postBody my-3">{post.postBody}</div>
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="bottom"
            data-original-title={likers}
          >
            {likes.length} Likes
          </span>
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="bottom"
            data-original-title={commentators}
          >
            {comments.length} Comments
          </span>
        </div>
        <PostButtons
          post={post._id}
          user={userId}
          liked={liked}
          reRenderPost={this.reRenderPost}
        />
        {comments.map(comment => (
          <Comment
            key={comment._id}
            comment={comment}
            user={userId}
            post={post._id}
            reRenderPost={this.reRenderPost}
          />
        ))}
        <AddComment
          postId={post._id}
          userId={userId}
          reRenderPost={this.reRenderPost}
        />
      </div>
    );
  }
}

export default Post;
