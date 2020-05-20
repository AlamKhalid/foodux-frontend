import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { toast } from "react-toastify";
import {
  getRestaurants,
  getServes,
  getBranches,
} from "./../services/userService";
import { submitPost, updatePost } from "./../services/postService";
import MultiSelect from "./common/multiSelect";
import EditorPopup from "./editorPopup";
import { storage } from "../firebase/index";

const AddReviewPopup = ({ user }) => {
  const [postId, setPostId] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [branchCityOptions, setBranchCityOptions] = useState([]);
  const [branchAreaOptions, setBranchAreaOptions] = useState([]);
  const [branchArray, setBranchArray] = useState([]);
  const [branchCity, setBranchCity] = useState("");
  const [branchArea, setBranchArea] = useState("");
  const [opinion, setOpinion] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [amountSpend, setAmountSpend] = useState("");
  const [tasteRating, setTasteRating] = useState("");
  const [serviceRating, setServiceRating] = useState("");
  const [ambienceRating, setAmbienceRating] = useState("");
  const [rating, setRating] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [ateFood, setAteFood] = useState([]);
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);
  const [progress, setProgress] = useState(0);
  const imgBtn = useRef(null);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
    $("#addReview").on("shown.bs.modal", function () {
      const post = JSON.parse(localStorage.getItem("post"));
      if (post) {
        setEdit(true);
        setPostId(post._id);
        setReviewBody(post.postBody);
        setRestaurant(post.restaurant.name);
        setBranchCity(post.branchCity);
        setBranchArea(post.branchArea);
        setAmountSpend(post.amountSpend);
        setAmbienceRating(post.ambienceRating);
        setTasteRating(post.tasteRating);
        setServiceRating(post.serviceRating);
        setRating(post.overallRating);
      }
    });
    $("#addReview").on("hidden.bs.modal", function () {
      localStorage.removeItem("post");
      setReviewBody("");
      setRestaurant("");
      setBranchCity("");
      setBranchArea("");
      setAmountSpend("");
      setAmbienceRating("");
      setTasteRating("");
      setServiceRating("");
      setRating("");
      setBranchAreaOptions([]);
      setBranchCityOptions([]);
      setFoodOptions([]);
      setPostId("");
      setEdit(false);
    });
    async function getData() {
      const { data: restaurants } = await getRestaurants();
      setRestaurantOptions(restaurants);
    }
    getData();
  }, []);

  const getBranchCities = async (name) => {
    const res = restaurantOptions.find((res) => res.name === name);
    const { data: branches } = await getBranches(res._id);
    const { data: serves } = await getServes(res._id);
    setFoodOptions(serves);
    setBranchArray(branches);
    setBranchCityOptions(branches.map((branch) => branch.city));
  };

  const getBranchAreas = (name) => {
    const branch = branchArray.find((branch) => branch.city === name);
    setBranchAreaOptions(branch.subareas);
  };

  const submitReview = async () => {
    const resId = restaurantOptions.find((res) => res.name === restaurant)._id;
    const commonAttr = {
      restaurant: resId,
      overallRating: rating,
      postBody: reviewBody,
      ateFood: [...ateFood],
      images: imageURLS,
      amountSpend,
      branchArea,
      branchCity,
      tasteRating,
      serviceRating,
      opinion,
      ambienceRating,
    };
    const response = edit
      ? await updatePost(postId, { ...commonAttr })
      : await submitPost({
          ...commonAttr,
          postType: "Review",
          postBy: user._id,
          creator: "User",
        });
    if (response) {
      window.location.reload();
      toast(`Post ${edit ? "updated" : "added"} successfully`);
    } else {
      toast.error(`Error while ${edit ? "updating" : "submitting"}`);
    }
  };

  const handleUpload = ({ target }) => {
    if (target.files[0]) {
      const image = target.files[0];
      const imageName = Date.now() + image.name;
      setImages([...images, image]);
      const uploadTask = storage.ref(`images/${imageName}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(prog);
        },
        (error) => {
          toast.error("Error uploading picture");
        },
        async () => {
          const url = await storage
            .ref("images")
            .child(imageName)
            .getDownloadURL();
          setImageURLS([...imageURLS, url]);
        }
      );
    }
  };

  return (
    <React.Fragment>
      <EditorPopup
        id="addReview"
        postBody={reviewBody}
        setPostBody={setReviewBody}
        edit={edit}
        label="review"
        imgDiv={
          imageURLS.length > 0 ? (
            <div className="mt-1">
              {imageURLS.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt=""
                  className="rounded-sm mr-2 post-img"
                />
              ))}
            </div>
          ) : null
        }
        prog={progress}
      >
        <div className="modal-footer">
          <div className="d-flex w-100 justify-content-between">
            <div>
              <input
                type="file"
                className="d-none"
                ref={imgBtn}
                onChange={handleUpload}
                multiple
              />
              <span onClick={() => imgBtn.current.click()}>
                <input
                  type="text"
                  className="dec img-icon mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Add images"
                />
              </span>
              <input
                type="text"
                list="restaurants"
                className="expand restaurant-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                value={restaurant}
                onChange={({ target }) => {
                  setRestaurant(target.value);
                  getBranchCities(target.value);
                }}
                title="Select Restaurant"
              />
              <datalist id="restaurants">
                {restaurantOptions.map((res) => (
                  <option key={res._id} value={res.name} />
                ))}
              </datalist>
              <input
                type="text"
                list="branch-city"
                value={branchCity}
                className="expand location-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Select Branch City"
                onChange={({ target }) => {
                  setBranchCity(target.value);
                  getBranchAreas(target.value);
                }}
              />
              <datalist id="branch-city">
                {restaurant.length > 0 ? (
                  branchCityOptions.map((city) => (
                    <option key={city} value={city} />
                  ))
                ) : (
                  <option value="Select Restaurant First" />
                )}
              </datalist>
              <input
                type="text"
                list="branch-area"
                value={branchArea}
                className="expand marker-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Select Branch Area"
                onChange={({ target }) => setBranchArea(target.value)}
              />
              <datalist id="branch-area">
                {branchCity.length > 0 ? (
                  branchAreaOptions.map((area) => (
                    <option key={area} value={area} />
                  ))
                ) : (
                  <option value="Select Branch City First" />
                )}
              </datalist>
              <input
                type="text"
                value={amountSpend}
                className="expand dollar-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter Spent Amount"
                onChange={({ target }) => setAmountSpend(target.value)}
              />
              <span data-toggle="modal" data-target="#ateFood">
                <input
                  type="text"
                  className="dec eat-icon mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select Ate Food"
                />
              </span>
              <input
                type="number"
                value={tasteRating}
                placeholder="   out of 5"
                className="expand mouth-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                onChange={({ target }) => setTasteRating(target.value)}
                title="Enter Taste Rating"
              />
              <input
                type="number"
                value={serviceRating}
                onChange={({ target }) => setServiceRating(target.value)}
                placeholder="   out of 5"
                className="expand lobby-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter Service Rating"
              />
              <input
                type="number"
                value={ambienceRating}
                onChange={({ target }) => setAmbienceRating(target.value)}
                placeholder="   out of 5"
                className="expand ambience-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Enter Ambience Rating"
              />
              <input
                type="text"
                list="recommended"
                value={opinion}
                className="expand review-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Recommended?"
                onChange={({ target }) => setOpinion(target.value)}
              />
              <datalist id="recommended">
                <option value="Recommended" />
                <option value="Not Recommended" />
              </datalist>
              <input
                type="number"
                value={rating}
                onChange={({ target }) => setRating(target.value)}
                placeholder="   out of 5"
                className="expand star-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Overall Experience"
              />
            </div>
            {edit ? (
              <button
                className="btn btn-warning"
                data-dismiss="modal"
                onClick={submitReview}
              >
                Update
              </button>
            ) : (
              <button
                className="btn foodux-btn"
                data-dismiss="modal"
                onClick={submitReview}
              >
                Post
              </button>
            )}
          </div>
        </div>
      </EditorPopup>
      {foodOptions.length > 0 && (
        <MultiSelect
          options={foodOptions}
          id="ateFood"
          setOutput={setAteFood}
          label="Select eat food"
          allLabel="All"
          value={edit ? ateFood : undefined}
          edit={edit}
        />
      )}
    </React.Fragment>
  );
};

export default AddReviewPopup;
