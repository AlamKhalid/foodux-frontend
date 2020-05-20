import React, { Component } from "react";

class ConfirmHideMarkup extends Component {
  render() {
    const { title, message, handleHide, label } = this.props;

    return (
      <div
        className="modal fade"
        id={`confirmHide${label}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={`confirmHide${label}Title`}
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
                className="btn btn-primary"
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
