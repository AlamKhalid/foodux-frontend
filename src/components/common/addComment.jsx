import React, { Component } from "react";

class AddComment extends Component {
  state = {
    commentBody: ""
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="d-flex flex-row">
        <img
          className="commentPic"
          src="https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png"
          alt=""
        />
        <input
          className="commentField"
          type="text"
          name="commentBody"
          value={this.state.commentBody}
          onChange={this.handleChange}
          placeholder="Add a comment..."
        />
      </div>
    );
  }
}

export default AddComment;
