import React, { useState, useEffect } from "react";
import $ from "jquery";
import { getFoods } from "../services/foodService";
import { submitPost, updatePost } from "../services/postService";
import { toast } from "react-toastify";
import MultiSelect from "./common/multiSelect";
import { getTypes } from "./../services/typeService";
import { getCities } from "./../services/cityService";
import EditorPopup from "./editorPopup";

const AddAskRecommendationPopup = ({ user }) => {
  const [postId, setPostId] = useState("");
  const [postBody, setPostBody] = useState("");
  const [location, setLocation] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [typeOptions, setTypeOptions] = useState([]);
  const [budget, setBudget] = useState([]);
  const [preferredFood, setPreferredFood] = useState([]);
  const [preferredType, setPreferredType] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      preferredFood.length === 0 ||
      preferredType.length === 0 ||
      budget === ""
    )
      setDisableBtn(true);
    else setDisableBtn(false);
  }, [preferredType, preferredFood, location, budget, postBody]);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
    $("#addRecommendation").on("shown.bs.modal", function () {
      const post = JSON.parse(localStorage.getItem("post"));
      if (post) {
        setEdit(true);
        setPostBody(post.postBody);
        setLocation(post.location);
        setBudget(post.budget);
        setPreferredFood(post.preferredFood);
        setPreferredType(post.preferredType);
        setPostId(post._id);
      }
    });
    $("#addRecommendation").on("hidden.bs.modal", function () {
      localStorage.removeItem("post");
      setPostBody("");
      setLocation("");
      setBudget("");
      setPreferredFood([]);
      setPreferredType([]);
      setPostId("");
      setEdit(false);
    });
    async function getData() {
      const { data: foods } = await getFoods();
      const { data: types } = await getTypes();
      const { data: cities } = await getCities();
      setTypeOptions(types);
      setCityOptions(cities);
      setFoodOptions(foods);
    }
    getData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commonAttr = {
      postBody,
      location,
      budget,
      preferredFood,
      preferredType,
    };
    const response = edit
      ? await updatePost(postId, { ...commonAttr })
      : await submitPost({
          creator: "User",
          postType: "Recommendation",
          postBy: user._id,
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
        id="addRecommendation"
        postBody={postBody}
        setPostBody={setPostBody}
        edit={edit}
        label="asking for recommendations post"
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
                list="cities"
                value={location}
                className="expand location-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Select Preferred City"
                onChange={({ target }) => setLocation(target.value)}
              />
              <datalist id="cities">
                {cityOptions.map((city) => (
                  <option key={city._id} value={city.name} />
                ))}
              </datalist>
              <input
                type="text"
                value={budget}
                className="expand dollar-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter Estimated Budget"
                onChange={({ target }) => setBudget(target.value)}
              />
              <span data-toggle="modal" data-target="#recommendationType">
                <input
                  type="text"
                  className="dec restaurant-icon mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select Preferred Restaurant Type"
                />
              </span>
              <span data-toggle="modal" data-target="#recommendationFood">
                <input
                  type="text"
                  className="dec eat-icon mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select Preferred Cuisine"
                />{" "}
              </span>
            </div>
            {!edit ? (
              <button className="btn foodux-btn" disabled={disableBtn}>
                Post
              </button>
            ) : (
              <button className="btn btn-warning">Update</button>
            )}
          </form>
        </div>
      </EditorPopup>
      {foodOptions.length > 0 && typeOptions.length > 0 && (
        <React.Fragment>
          <MultiSelect
            options={typeOptions}
            id="recommendationType"
            setOutput={setPreferredType}
            label="Select preferred restaurant type"
            name="type"
            allLabel="Any"
            value={edit ? preferredType : undefined}
            edit={edit}
          />
          <MultiSelect
            options={foodOptions}
            id="recommendationFood"
            setOutput={setPreferredFood}
            label="Select preferred cuisine"
            allLabel="Any"
            value={edit ? preferredFood : undefined}
            edit={edit}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AddAskRecommendationPopup;
