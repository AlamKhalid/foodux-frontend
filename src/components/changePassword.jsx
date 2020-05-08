import React, { useState, useEffect } from "react";
import { changePassword } from "./../services/userService";
import { toast } from "react-toastify";

const ChangePassword = ({ user, setUser }) => {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (
      oldPass.length === 0 ||
      newPass.length === 0 ||
      confirmPass.length === 0
    )
      setDisableBtn(true);
    else if (newPass !== confirmPass) setDisableBtn(true);
    else setDisableBtn(false);
  }, [oldPass, newPass, confirmPass]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await changePassword(user._id, {
      oldPass,
      newPass,
    });
    if (!response) toast.error("Error updating password");
    else if (response === "wrong") toast.error("Old password is incorrect");
    else if (response === "same")
      toast.error("New password cannot be old password");
    else {
      setUser(response);
      toast("Password updated");
    }
  };

  return (
    <div
      id="collapseThree"
      className="collapse"
      aria-labelledby="change-password"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <label htmlFor="old-pass" className="label-1 w-20">
            Old Password
          </label>
          <input
            type="password"
            value={oldPass}
            onChange={({ target }) => setOldPass(target.value)}
            className="form-control text-box w-50 d-inline"
            placeholder="Type in old password"
          />
          <br /> <br />
          <label className="label-1 w-20">New Password</label>
          <input
            type="password"
            value={newPass}
            onChange={({ target }) => setNewPass(target.value)}
            className="form-control text-box w-50 d-inline"
            placeholder="Type in new password"
          />
          <br /> <br />
          <label className="label-1 w-20">Confirm Password</label>
          <input
            type="password"
            value={confirmPass}
            onChange={({ target }) => setConfirmPass(target.value)}
            className="form-control text-box w-50 d-inline"
            placeholder="Type in new password again"
          />
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
