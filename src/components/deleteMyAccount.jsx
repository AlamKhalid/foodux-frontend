import React from "react";

const DeleteMyAccount = ({ user }) => {
  return (
    <div
      id="collapseSix"
      className="collapse"
      aria-labelledby="delete-my-account"
      data-parent="#accordion"
    >
      <div className="card-body">
        <p>
          <em>
            <b>Caution:</b> You will not be able to restore any data after
            deleting your account. Moreover, all of your posts will also be
            deleted.
          </em>
        </p>
        <div className="custom-control custom-checkbox">
          <input
            type="checkbox"
            className="custom-control-input"
            id="customCheck1"
          />
          <label className="custom-control-label" htmlFor="customCheck1">
            I'm aware of the consequences
          </label>
        </div>
        <button className="btn btn-danger mt-3">Delete</button>
      </div>
    </div>
  );
};

export default DeleteMyAccount;
