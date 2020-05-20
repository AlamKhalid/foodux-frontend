import React, { PureComponent } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import { toast } from "react-toastify";
import OwnCommentOptions from "./ownCommentOptions";
import OtherCommentOptions from "./otherCommentOptions";
import { unhideComment } from "./../../services/userService";

class Comment extends PureComponent {
  state = {
    commentOptionClass: "d-none", // hides the comment's options, show them only on hover
    hiddenCommentClass: "", // shows hidden comments with low opacity
  };

  componentDidMount() {
    $('[data-toggle-second="tooltip"]').tooltip(); // for data-toggle = tooltip
    const hiddenCommentClass = this.props.hidden ? "hidden-comment" : ""; // to show hidden comments as hidden
    this.setState({ hiddenCommentClass });
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

  reRenderComment = () => {
    this.setState({ hiddenCommentClass: "hidden-comment" });
  };

  handleUnhide = async () => {
    const response = await unhideComment({
      userId: this.props.userId,
      commentId: this.props.comment._id,
    });
    if (response) {
      this.props.reRenderPost();
      this.setState({ hiddenCommentClass: "" });
      toast("Comment unhidden");
    } else {
      toast.error("Error unhiding comment");
    }
  };

  render() {
    // destructuring props and props.comment
    const { commentBody, commentBy, _id } = this.props.comment;
    const { userId, post, hidden } = this.props;
    return (
      <React.Fragment>
        <div className="d-flex">
          <div
            className={`d-flex flex-row mb-3 ${this.state.hiddenCommentClass}`}
            onMouseEnter={this.showOptions}
            onMouseLeave={this.hideOptions}
          >
            <img className="commentPic" src={commentBy.profilePic} alt="" />
            <div className="text-justify comment">
              <NavLink className="userName mr-2" to="/">
                {commentBy.name}
              </NavLink>
              <span>{commentBody}</span>
            </div>
            {!hidden && (
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
                  commentBy._id === userId
                    ? "Edit or delete comment"
                    : "Hide comment"
                }
              ></i>
            )}
            {commentBy._id === userId ? (
              <OwnCommentOptions
                comment={_id}
                commentBody={commentBody}
                post={post}
                reRenderPost={this.props.reRenderPost}
              />
            ) : (
              <OtherCommentOptions
                reRenderPost={this.props.reRenderPost}
                reRenderComment={this.reRenderComment}
                commentId={_id}
                userId={userId}
                hidden={hidden}
              />
            )}
          </div>
          {hidden && (
            <div className="unhide ml-2 text-muted" onClick={this.handleUnhide}>
              Unhide
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Comment;
