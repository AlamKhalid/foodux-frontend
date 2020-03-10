import React, { Component } from "react";
import { toast } from "react-toastify";
import { updateComment } from "../../services/commentService";

class ConfirmUpdateMarkupComment extends Component {
  state = {
    comment: "",
    editedComment: ""
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
        commentBody: editedComment
      };
      const response = await updateComment(comment);
      if (response) {
        toast.info("Comment has been updated");
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
        class="modal fade"
        id="confirmUpdateComment"
        tabindex="-1"
        role="dialog"
        aria-labelledby="confirmUpdateCommentTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                Edit Comment
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.restoreState}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <textarea
                className="createPostBody h-auto"
                name="editedComment"
                value={this.state.editedComment}
                onChange={this.handleChange}
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.restoreState}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-warning"
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
