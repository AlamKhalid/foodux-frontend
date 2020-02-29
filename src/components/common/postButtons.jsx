import React, { Component } from "react";
import { toast } from "react-toastify";
import { like, unlike } from "../../services/likeService";

class PostButtons extends Component {
  state = {
    likeBtnClass: ""
  };

  componentDidMount() {
    let likeBtnClass = "";
    if (this.props.liked) likeBtnClass = " app-color";
    else likeBtnClass = "-o";
    this.setState({ likeBtnClass });
  }

  handleClick = async () => {
    let likeBtnClass;
    const body = { postId: this.props.post, userId: this.props.user };
    if (this.state.likeBtnClass === "-o") {
      const response = await like(body);
      if (response) likeBtnClass = " app-color";
      else {
        toast.error("Error liking post");
      }
    } else {
      const response = await unlike(body);
      if (response) likeBtnClass = "-o";
      else {
        toast.error("Error unliking post");
      }
    }
    this.setState({ likeBtnClass });
    this.props.reRenderPost();
  };

  render() {
    return (
      <div className="d-flex justify-content-around postBtns mb-2">
        <span className="postBtn" onClick={this.handleClick}>
          <i className={`fa mr-3 fa-heart${this.state.likeBtnClass}`}></i>Like
        </span>
        <span className="postBtn">
          <i className="fa fa-comment-o mr-3"></i>Add on
        </span>
      </div>
    );
  }
}

export default PostButtons;
