import React, { Component } from "react";

class ConfirmHideMarkup extends Component {
  render() {
    return (
      <div className="custom-ui">
        <h1 className="title-popup mb-3">{this.props.title}</h1>
        <p className="msg-popup">{this.props.message}</p>
        <button
          className="btn btn-primary btn-sm mr-2"
          onClick={() => {
            this.props.handleHide();
            this.props.onClose();
          }}
        >
          Hide
        </button>
        <button className="btn btn-dark btn-sm" onClick={this.props.onClose}>
          Cancel
        </button>
      </div>
    );
  }
}

export default ConfirmHideMarkup;
