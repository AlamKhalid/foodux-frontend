import React, { Component } from "react";
import { toast } from "react-toastify";
import { updateComment } from "../../services/commentService";

class ConfirmUpdateMarkupComment extends Component {
  state = {
    comment: "",
    editedComment: "",
  };

  componentDidMount() {
    const { commentBody } = this.props;
    this.setState({ comment: commentBody, editedComment: commentBody });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleUpdate = async () => {
    const { editedComment } = this.state;
    if (editedComment.length > 0) {
      const comment = {
        commentId: this.props.comment,
        postId: this.props.post,
        commentBody: editedComment,
      };
      const response = await updateComment(comment);
      if (response) {
        toast("Comment has been updated");
        this.setState({ comment: editedComment });
        this.props.reRenderPost();
      } else {
        toast.error("Error editing comment");
      }
    } else {
      toast.error("Comment's length cannot be zero");
    }
  };

  handleDisable = () => {
    const { editedComment, comment } = this.state;
    if (editedComment === comment) return true;
    if (editedComment.length === 0) return true;
    return false;
  };

  restoreState = () => {
    const { comment } = this.state;
    this.setState({ editedComment: comment });
  };

  render() {
    return (
      <div
        className="modal fade"
        id="confirmUpdateComment"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmUpdateCommentTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">
                Edit Comment
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.restoreState}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <textarea
                className="create-post-body h-auto"
                name="editedComment"
                value={this.state.editedComment}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.restoreState}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-warning"
                data-dismiss="modal"
                disabled={this.handleDisable()}
                onClick={this.handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmUpdateMarkupComment;
