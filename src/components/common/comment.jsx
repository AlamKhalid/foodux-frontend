import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import $ from "jquery";
import OwnCommentOptions from "./ownCommentOptions";
import OtherCommentOptions from "./otherCommentOptions";

class Comment extends Component {
  state = {
    commentOptionClass: "d-none"
  };

  componentDidMount() {
    $('[data-toggle-second="tooltip"]').tooltip();
  }

  showOptions = () => {
    const commentOptionClass = "";
    this.setState({ commentOptionClass });
  };

  hideOptions = () => {
    const commentOptionClass = "d-none";
    this.setState({ commentOptionClass });
  };

  render() {
    const { commentBody, commentBy } = this.props.comment;
    const { user } = this.props;

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
          <OwnCommentOptions />
        ) : (
          <OtherCommentOptions />
        )}
      </div>
    );
  }
}

export default Comment;
