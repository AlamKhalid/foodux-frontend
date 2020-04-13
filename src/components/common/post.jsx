import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import Comment from "./comment";
import AddComment from "./addComment";
import PostButtons from "./postButtons";
import PostOptions from "./postOptions";
import { getPost } from "../../services/postService";
import { getHiddenComments } from "./../../services/userService";

class Post extends Component {
  constructor(props) {
    super(props);
    this.commentInputRef = React.createRef();
  }

  state = {
    comments: [], // stores the comments array on a single post
    hiddenComments: [], // stores the hidden comments ids for a single user
    likes: [], // stores the likes array for a single post
  };

  async componentDidMount() {
    // updates the state with the props passed to this component
    const { data: hiddenComments } = await getHiddenComments(this.props.userId);
    const { comments, likes } = this.props.post;
    this.setState({ comments, likes, hiddenComments });
    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  reRenderPost = async () => {
    // re-render the post if a user either likes it or comments on it to show real-time changes
    const { data: post } = await getPost(this.props.post._id);
    const { data: hiddenComments } = await getHiddenComments(this.props.userId);
    this.setState({
      comments: post.comments,
      likes: post.likes,
      hiddenComments,
    });
  };

  // function to get the names of all likers of a post, to show them as tooltip
  getLikesName = () => {
    const { likes } = this.state;
    let likers = "",
      counter = 0;
    // only shows 5 likers, rest remaining as numbers
    this.state.likes.forEach(function (like) {
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
    comments.forEach(function (comment) {
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
    const { post, userId, liked, reRenderPosts } = this.props;
    const { comments, likes, hiddenComments } = this.state;
    const likers = this.getLikesName();
    const commentators = this.getCommentsName();

    return (
      <div className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <img
              className="displayPostPicture"
              src="https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg?w=1200"
              alt=""
            />
            <div className="d-flex flex-column align-items-start">
              <NavLink className="userName" to={`/user/${post.postBy._id}`}>
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
            postBody={post.postBody}
            location={post.location}
            amountSpend={post.amountSpend}
            reRenderPosts={reRenderPosts}
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
          commentInputRef={this.commentInputRef}
          post={post._id}
          userId={userId}
          liked={liked}
          reRenderPost={this.reRenderPost}
        />
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            userId={userId}
            post={post._id}
            hidden={hiddenComments.indexOf(comment._id) > -1 ? true : false}
            reRenderPost={this.reRenderPost}
          />
        ))}
        <AddComment
          commentInputRef={this.commentInputRef}
          postId={post._id}
          userId={userId}
          reRenderPost={this.reRenderPost}
        />
      </div>
    );
  }
}

export default Post;
