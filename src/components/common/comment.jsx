import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Comment extends Component {
  state = {};
  render() {
    return (
      <div className="d-flex flex-row mb-3">
        <img
          className="commentPic"
          src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
          alt=""
        />
        <div className="text-justify comment">
          <NavLink className="userName mr-2" to="/">
            Username
          </NavLink>
          <span id="commentBody">
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only
            five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
      </div>
    );
  }
}

export default Comment;
