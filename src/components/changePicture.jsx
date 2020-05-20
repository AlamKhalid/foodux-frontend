import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { storage } from "../firebase/index";
import { updateProfilePic } from "../services/userService";

const ChangePicture = ({ user, setUser }) => {
  const [url, setUrl] = useState(user.profilePic);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    if (url !== user.profilePic) setDisableBtn(false);
  }, [url, user]);

  const uploadPic = ({ target }) => {
    if (target.files[0]) {
      const image = target.files[0];
      const imageName = Date.now() + image.name;
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progress
        },
        (error) => {
          toast.error("Error uploading picture");
        },
        async () => {
          const url = await storage
            .ref("images")
            .child(imageName)
            .getDownloadURL();
          setUrl(url);
        }
      );
    }
  };

  const updatePic = async (event) => {
    event.preventDefault();
    const res = await updateProfilePic(user._id, { pic: url });
    if (res) {
      const updatedUser = { ...user };
      user.profilePic = url;
      setUser(updatedUser);
      toast("Settings saved");
    } else {
      toast.error("Error updating profile picture");
    }
  };

  return (
    <div
      id="collapseSeven"
      className="collapse"
      aria-labelledby="change-pic"
      data-parent="#accordion"
    >
      <div className="card-body">
        <form method="post" onSubmit={updatePic}>
          <img src={url} alt="" className="profile-pic-setts rounded-sm" />
          <div className="custom-file mb-3 w-50 text-left">
            <input
              type="file"
              className="custom-file-input"
              name="profile"
              onChange={uploadPic}
            />
            <label className="custom-file-label" htmlFor="customFile">
              Change your profile picture
            </label>
          </div>
          <button className="btn foodux-btn float-right" disabled={disableBtn}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePicture;
