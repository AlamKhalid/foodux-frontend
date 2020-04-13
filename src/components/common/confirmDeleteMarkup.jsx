import React, { Component } from "react";

class ConfirmDeleteMarkup extends Component {
  render() {
    const { title, message, handleDelete } = this.props;

    return (
      <div
        className="modal fade"
        id="confirmDelete"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="confirmDeleteTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
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
