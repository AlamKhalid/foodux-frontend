import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { updateBasicSettings } from "../services/userService";

const BasicSettingsRes = ({ user, setUser }) => {
  const [name, setName] = useState(user.name);
  const [website, setWebsite] = useState(user.website);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (user.name !== name.trim() || user.website !== website.trim())
      setDisableBtn(false);
    else setDisableBtn(true);
  }, [user, name, website]);

  const updateData = async (event) => {
    event.preventDefault();
    const { data: response } = await updateBasicSettings(user._id, {
      name,
      website,
    });
    if (response) {
      setUser(response);
      toast("Settings saved");
    } else toast.error("Error updating profile");
  };

  return (
    <div
      id="collapseOne"
      className="collapse show"
      aria-labelledby="basic-settings"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updateData}>
          <label htmlFor="id" className="label-1 w-10">
            User ID
          </label>
          <input
            type="text"
            className="form-control text-box w-50 d-inline"
            value={user._id}
            disabled
          />
          <br /> <br />
          <label htmlFor="name" className="label-1 w-10">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
            className="form-control text-box w-50 d-inline"
            required
          />
          <br /> <br />
          <label htmlFor="email" className="label-1 w-10">
            Email
          </label>
          <input
            type="email"
            className="form-control text-box w-50 d-inline"
            value={user.email}
            disabled
          />
          <br /> <br />
          <label className="label-1 w-10">Website</label>
          <input
            type="url"
            className="form-control text-box w-50 d-inline"
            value={user.website}
            onChange={({ target }) => setWebsite(target.value)}
          />
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default BasicSettingsRes;
