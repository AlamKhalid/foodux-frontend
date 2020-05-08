import React, { Component } from "react";
import { toast } from "react-toastify";
import { like, unlike } from "../../services/likeService";

class PostButtons extends Component {
  state = {
    likeBtnClass: "",
  };

  componentDidMount() {
    let likeBtnClass = "";
    if (this.props.liked) likeBtnClass = " app-color";
    else likeBtnClass = "-o";
    this.setState({ likeBtnClass });
  }

  handleLike = async () => {
    let likeBtnClass, response;
    const body = {
      postId: this.props.post,
      userId: this.props.user._id,
      isRestaurant: this.props.user.isRestaurant,
    };
    if (this.state.likeBtnClass === "-o") {
      response = await like(body);
      if (response) likeBtnClass = " app-color";
      else {
        toast.error("Error liking post");
      }
    } else {
      response = await unlike(body);
      if (response) likeBtnClass = "-o";
      else {
        toast.error("Error unliking post");
      }
    }
    this.setState({ likeBtnClass });
    this.props.reRenderPost();
  };

  handleFocus = () => {
    this.props.commentInputRef.current.focus();
  };

  render() {
    return (
      <div className="d-flex justify-content-around postBtns mb-2">
        <span className="postBtn" onClick={this.handleLike}>
          <i className={`fa mr-3 fa-heart${this.state.likeBtnClass}`}></i>Like
        </span>
        <span className="postBtn" onClick={this.handleFocus}>
          <i className="fa fa-comment-o mr-3"></i>Add on
        </span>
      </div>
    );
  }
}

export default PostButtons;
