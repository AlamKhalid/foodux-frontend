import React, { useState, useEffect } from "react";
import $ from "jquery";
import { submitPost, updatePost } from "../services/postService";
import { toast } from "react-toastify";
import { getFoods } from "./../services/foodService";
import EditorPopup from "./editorPopup";

const AddAnnouncementPopup = ({ user }) => {
  const [postBody, setPostBody] = useState("");
  const [postType, setPostType] = useState("Announcement");
  const [price, setPrice] = useState("");
  const [item, setItem] = useState("");
  const [food, setFood] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [edit, setEdit] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
    $("#addAnnouncement").on("shown.bs.modal", function () {
      const post = JSON.parse(localStorage.getItem("post"));
      if (post) {
        setEdit(true);
        setPostId(post._id);
        setPrice(post.price);
        setItem(post.foodType);
        setPostBody(post.postBody);
      }
    });
    $("#addAnnouncement").on("hidden.bs.modal", function () {
      localStorage.removeItem("post");
      setPostBody("");
      setPostId("");
      setPrice("");
      setItem("");
      setEdit(false);
    });
  }, []);

  useEffect(() => {
    if (postBody.length === 0 || price === "" || food === "")
      setDisableBtn(true);
    else setDisableBtn(false);
  }, [postBody, price, food]);

  useEffect(() => {
    async function getData() {
      const { data: allFood } = await getFoods();
      setFood(allFood);
    }
    getData();
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commonAttr = { foodType: item, price, postBody };
    const response = edit
      ? await updatePost(postId, { ...commonAttr })
      : await submitPost({
          creator: "Restaurant",
          postBy: user._id,
          postType,
          ...commonAttr,
        });
    if (response) {
      window.location.reload();
      toast(`Post ${edit ? "updated" : "added"} successfully`);
    } else {
      toast.error(`Error while ${edit ? "updating" : "submitting"}`);
    }
  };

  return (
    <React.Fragment>
      <EditorPopup
        id="addAnnouncement"
        postBody={postBody}
        setPostBody={setPostBody}
        edit={edit}
        label="announcement post"
      >
        <div className="modal-footer">
          <form
            method="post"
            onSubmit={handleSubmit}
            className="d-flex justify-content-between w-100"
          >
            <div>
              <input
                type="text"
                value={postType}
                list="type2"
                className="expand hand-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Choose Type"
                onChange={({ target }) => setPostType(target.value)}
              />
              <datalist id="type2">
                <option value="Announcement" />
              </datalist>
              <input
                type="number"
                value={price}
                className="expand dollar-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter price"
                onChange={({ target }) => setPrice(target.value)}
              />
              <input
                type="text"
                value={item}
                list="foodItem"
                className="expand eat-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Select introductory item type"
                onChange={({ target }) => setItem(target.value)}
              />
              <datalist id="foodItem">
                {food.map((foo) => (
                  <option key={foo._id} value={foo.name} />
                ))}
              </datalist>
            </div>
            {edit ? (
              <button className="btn btn-warning">Update</button>
            ) : (
              <button className="btn foodux-btn" disabled={disableBtn}>
                Post
              </button>
            )}
          </form>
        </div>
      </EditorPopup>
    </React.Fragment>
  );
};

export default AddAnnouncementPopup;
