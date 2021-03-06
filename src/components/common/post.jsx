import React, { Component } from "react";
import $ from "jquery";
import Comment from "./comment";
import AddComment from "./addComment";
import PostButtons from "./postButtons";
import { getPost } from "../../services/postService";
import { getHiddenComments } from "./../../services/userService";
import ReviewPost from "./reviewPost";
import DealPost from "./dealPost";
import DiscountPost from "./discountPost";
import AnnouncementPost from "./announcementPost";
import RecommendationAskPost from "./recommendationAskPost";
import WhatPost from "./whatPost";
import ImageInPosts from "./imagesInPost";

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
    const { user, post } = this.props;

    const { data: hiddenComments } = await getHiddenComments(user._id);
    const { comments, likes } = post;
    this.setState({ comments, likes, hiddenComments });

    $('[data-toggle="tooltip"]').tooltip({ html: true });
  }

  reRenderPost = async () => {
    // re-render the post if a user either likes it or comments on it to show real-time changes
    const { user } = this.props;
    const { data: post } = await getPost(this.props.post._id);
    let hiddenComments = [];

    const { data } = await getHiddenComments(user._id);
    hiddenComments = data;

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
    const { post, user, liked, reRenderPosts, profile } = this.props;
    const { comments, likes, hiddenComments } = this.state;
    const likers = this.getLikesName();
    const commentators = this.getCommentsName();

    return (
      <div className="bg-light pt-3 px-3 pb-2 my-2 rounded-lg">
        {post.postType === "Review" && (
          <ReviewPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        {post.postType === "Deal" && (
          <DealPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        {post.postType === "Discount" && (
          <DiscountPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        {post.postType === "Announcement" && (
          <AnnouncementPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        {post.postType === "Recommendation" && (
          <RecommendationAskPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        {post.postType === "What" && (
          <WhatPost
            reRenderPosts={reRenderPosts}
            post={post}
            userId={user._id}
          />
        )}
        <ImageInPosts images={post.images} />
        <div className="d-flex justify-content-between mb-2">
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title={likers}
          >
            {likes.length} Likes
          </span>
          <span
            className="text-muted postLikeComment"
            role="button"
            data-toggle="tooltip"
            data-placement="top"
            data-original-title={commentators}
          >
            {comments.length} Comments
          </span>
        </div>
        <PostButtons
          commentInputRef={this.commentInputRef}
          post={post._id}
          user={user}
          liked={liked}
          reRenderPost={this.reRenderPost}
        />
        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            userId={user._id}
            post={post._id}
            hidden={hiddenComments.indexOf(comment._id) > -1 ? true : false}
            reRenderPost={this.reRenderPost}
          />
        ))}
        <AddComment
          commentInputRef={this.commentInputRef}
          postId={post._id}
          userId={user._id}
          reRenderPost={this.reRenderPost}
          userPic={profile ? user.profilePic : user.pic}
        />
      </div>
    );
  }
}

export default Post;
