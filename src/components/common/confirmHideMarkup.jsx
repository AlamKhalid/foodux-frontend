import React, { Component } from "react";

class ConfirmHideMarkup extends Component {
  render() {
    const { title, message, handleHide } = this.props;

    return (
      <div
        class="modal fade"
        id="confirmHide"
        tabindex="-1"
        role="dialog"
        aria-labelledby="confirmHideTitle"
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
                class="btn btn-primary"
                data-dismiss="modal"
                onClick={handleHide}
              >
                Hide
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ConfirmHideMarkup;
