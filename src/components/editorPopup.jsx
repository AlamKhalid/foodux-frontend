import React from "react";

const EditorPopup = ({
  children,
  postBody,
  setPostBody,
  id,
  edit,
  label,
  imgDiv = null,
  prog = 0,
}) => {
  return (
    <div
      className="modal fade"
      id={id}
      tabIndex="-1"
      role="dialog"
      aria-labelledby={`${id}Title`}
      aria-hidden="true"
    >
      <div
        className="modal-dialog modal-dialog-centered modal-xl"
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3 className="modal-title w-100 text-center text-uppercase add-spacing ml-5">
              {edit ? "update" : "add"} {label}
            </h3>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => localStorage.removeItem("post")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <textarea
              style={{ width: "100%", minHeight: "40vh" }}
              value={postBody}
              className="create-post-body"
              onChange={({ target }) => setPostBody(target.value)}
            ></textarea>
            {prog > 0 && prog < 100 && <progress value={prog} max="100" />}
            {imgDiv && imgDiv}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default EditorPopup;
