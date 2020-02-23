import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    const { commentBody, commentBy } = this.props.comment;

    return (
      <div className="d-flex flex-row mb-3">
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
      </div>
    );
  }
}

export default Comment;
