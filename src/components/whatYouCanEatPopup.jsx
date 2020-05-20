import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { submitPost, updatePost } from "../services/postService";
import { toast } from "react-toastify";
import MultiSelect from "./common/multiSelect";
import { getFoods } from "./../services/foodService";
import { getCities } from "./../services/cityService";
import { getRestaurantsCity } from "./../services/userService";
import EditorPopup from "./editorPopup";
import { storage } from "../firebase/index";

const WhatYouCanEatPopup = ({ user }) => {
  const [postId, setPostId] = useState("");
  const [postBody, setPostBody] = useState("");
  const [location, setLocation] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [restaurantOptions, setRestaurantOptions] = useState([]);
  const [budget, setBudget] = useState([]);
  const [rating, setRating] = useState("");
  const [ateFood, setAteFood] = useState([]);
  const [edit, setEdit] = useState(false);
  const [restaurantsBeen, setRestaurantBeen] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);
  const [progress, setProgress] = useState(0);
  const imgBtn = useRef(null);

  useEffect(() => {
    if (
      postBody.length === 0 ||
      location.length === 0 ||
      ateFood.length === 0 ||
      restaurantsBeen.length === 0 ||
      budget === "" ||
      rating === ""
    )
      setDisableBtn(true);
    else setDisableBtn(false);
  }, [restaurantsBeen, ateFood, location, budget, postBody, rating]);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
    $("#addWhat").on("shown.bs.modal", function () {
      const post = JSON.parse(localStorage.getItem("post"));
      if (post) {
        setEdit(true);
        setPostBody(post.postBody);
        setLocation(post.location);
        setBudget(post.budget);
        setRating(post.overallRating);
        setAteFood(post.ateFood);
        setRestaurantBeen(post.restaurantsBeen.map((res) => res._id));
        setPostId(post._id);
      }
    });
    $("#addWhat").on("hidden.bs.modal", function () {
      localStorage.removeItem("post");
      setPostBody("");
      setLocation("");
      setBudget("");
      setRating("");
      setAteFood([]);
      setRestaurantBeen([]);
      setPostId("");
      setEdit(false);
    });
    async function getData() {
      const { data: foods } = await getFoods();
      const { data: cities } = await getCities();
      setCityOptions(cities);
      setFoodOptions(foods);
    }
    getData();
  }, []);

  useEffect(() => {
    if (!edit) {
      setPostBody("");
    }
  }, [edit]);

  useEffect(() => {
    async function fillRestaurants() {
      if (location.length > 0) {
        const { data: rests } = await getRestaurantsCity(location);
        setRestaurantOptions(rests);
      }
    }
    fillRestaurants();
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const commonAttr = {
      overallRating: rating,
      postBody,
      location,
      budget,
      ateFood,
      restaurantsBeen,
      images: imageURLS,
    };

    const response = edit
      ? await updatePost(postId, { ...commonAttr })
      : await submitPost({
          creator: "User",
          postType: "What",
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
        id="addWhat"
        postBody={postBody}
        setPostBody={setPostBody}
        edit={edit}
        label="what you can eat post"
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
          <form
            method="post"
            onSubmit={handleSubmit}
            className="d-flex justify-content-between w-100"
          >
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
                list="cities"
                value={location}
                className="expand location-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Select City"
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
                title="Enter Spent Budget"
                onChange={({ target }) => setBudget(target.value)}
              />
              <span data-toggle="modal" data-target="#restaurantsBeen">
                <input
                  type="text"
                  className="dec restaurant-icon mr-2"
                  data-toggle="tooltip"
                  data-placement="top"
                  title="Select Restaurants"
                />
              </span>
              <span data-toggle="modal" data-target="#hadFood">
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
              <button className="btn btn-warning">Update</button>
            ) : (
              <button className="btn foodux-btn" disabled={disableBtn}>
                Post
              </button>
            )}
          </form>
        </div>
      </EditorPopup>
      {restaurantOptions.length > 0 && (
        <MultiSelect
          options={restaurantOptions}
          id="restaurantsBeen"
          setOutput={setRestaurantBeen}
          label="Select Restaurants"
          name="restaurant"
          allLabel="All"
          edit={edit}
          storeId={true}
          value={edit ? restaurantsBeen : undefined}
        />
      )}
      {foodOptions.length > 0 && (
        <MultiSelect
          options={foodOptions}
          id="hadFood"
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

export default WhatYouCanEatPopup;
