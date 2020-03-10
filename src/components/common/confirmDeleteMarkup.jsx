import React, { Component } from "react";

class ConfirmDeleteMarkup extends Component {
  render() {
    const { title, message, handleDelete } = this.props;

    return (
      <div
        class="modal fade"
        id="confirmDelete"
        tabindex="-1"
        role="dialog"
        aria-labelledby="confirmDeleteTitle"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">{title}</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">{message}</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={handleDelete}
                data-dismiss="modal"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmDeleteMarkup;
