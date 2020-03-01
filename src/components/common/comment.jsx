import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import OwnCommentOptions from "./ownCommentOptions";
import OtherCommentOptions from "./otherCommentOptions";

class Comment extends Component {
  state = {
    commentOptionClass: "d-none" // hides the comment's options, show them only on hover
  };

  componentDidMount() {
    $('[data-toggle-second="tooltip"]').tooltip(); // for data-toggle = tooltip
  }

  showOptions = () => {
    // function to show comment's option on hover
    const commentOptionClass = "";
    this.setState({ commentOptionClass });
  };

  hideOptions = () => {
    // function to hide comment's option on hover out
    const commentOptionClass = "d-none";
    this.setState({ commentOptionClass });
  };

  render() {
    // destructuring props and props.comment
    const { commentBody, commentBy, _id } = this.props.comment;
    const { user, post } = this.props;

    return (
      <div
        className="d-flex flex-row mb-3"
        onMouseEnter={this.showOptions}
        onMouseLeave={this.hideOptions}
      >
        <img
          className="commentPic"
          src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
          alt=""
        />
        <div className="text-justify comment">
          <NavLink className="userName mr-2" to="/">
            {commentBy.name}
          </NavLink>
          <span>{commentBody}</span>
        </div>
        <i
          className={`${this.state.commentOptionClass} fa fa-ellipsis-h my-auto ml-2`}
          id="commentOptions"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          data-toggle-second="tooltip"
          data-placement="top"
          title={
            commentBy._id === user ? "Edit or delete comment" : "Hide comment"
          }
        ></i>
        {commentBy._id === user ? (
          <OwnCommentOptions
            comment={_id}
            commentBody={commentBody}
            post={post}
            reRenderPost={this.props.reRenderPost}
          />
        ) : (
          <OtherCommentOptions reRenderPost={this.props.reRenderPost} />
        )}
      </div>
    );
  }
}

export default Comment;
