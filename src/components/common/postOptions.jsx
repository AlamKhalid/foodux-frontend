import React, { Component } from "react";
import OtherPostOptions from "./othersPostOptions";
import OwnPostOptions from "./ownPostOptions";

class PostOptions extends Component {
  state = {};

  render() {
    const { postBy, user } = this.props;

    return (
      <div>
        <i
          className="fa fa-ellipsis-v text-muted"
          id="postOptions"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        ></i>
        {postBy._id === user ? <OwnPostOptions /> : <OtherPostOptions />}
      </div>
    );
  }
}

export default PostOptions;
