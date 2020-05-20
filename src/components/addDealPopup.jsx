import React, { useState, useEffect, useRef } from "react";
import $ from "jquery";
import { getServes } from "../services/userService";
import { submitPost, updatePost } from "../services/postService";
import { toast } from "react-toastify";
import DealType from "./dealType";
import DiscountType from "./discountType";
import MultiSelect from "./common/multiSelect";
import EditorPopup from "./editorPopup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { storage } from "../firebase/index";

const AddDealPopup = ({ user }) => {
  const [postId, setPostId] = useState("");
  const [postBody, setPostBody] = useState("");
  const [postType, setPostType] = useState("");
  const [discount, setDiscount] = useState("");
  const [exceptFor, setExceptFor] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [modes, setModes] = useState("");
  const [validTill, setValidTill] = useState("");
  const [foodOptions, setFoodOptions] = useState([]);
  const [foodIncluded, setFoodIncluded] = useState([]);
  const [disableBtn, setDisableBtn] = useState(true);
  const [edit, setEdit] = useState(false);
  const [images, setImages] = useState([]);
  const [imageURLS, setImageURLS] = useState([]);
  const [progress, setProgress] = useState(0);
  const imgBtn = useRef(null);

  useEffect(() => {
    if (postBody.length === 0 || postType.length === 0) setDisableBtn(true);
    else if (
      postType === "Deal" &&
      (price === "" ||
        oldPrice === "" ||
        modes.length === 0 ||
        validTill.length === 0 ||
        foodIncluded.length === 0)
    )
      setDisableBtn(true);
    else if (
      postType === "Discount" &&
      (modes.length === 0 ||
        validTill.length === 0 ||
        foodIncluded.length === 0 ||
        discount === "")
    )
      setDisableBtn(true);
    else setDisableBtn(false);
  }, [
    postBody,
    postType,
    modes,
    price,
    oldPrice,
    validTill,
    foodIncluded,
    discount,
  ]);

  useEffect(() => {
    async function getData() {
      const { data: foods } = await getServes(user._id);
      setFoodOptions(foods);
    }
    getData();
  }, [user]);

  useEffect(() => {
    $("#addDeal").on("shown.bs.modal", function () {
      const post = JSON.parse(localStorage.getItem("post"));
      if (post) {
        const [d, m, y] = post.validTill.split("-");
        setEdit(true);
        setPostBody(post.postBody);
        setPostId(post._id);
        setPrice(post.dealPrice);
        setOldPrice(post.oldPrice);
        setModes(post.validOn);
        setValidTill(new Date(`${y}-${m}-${d}T10:20:30Z`));
        setFoodIncluded(post.dealItems);
        setDiscount(post.discount);
        setExceptFor(post.exceptFor);
        setPostType(post.postType);
        setImageURLS(post.images);
      }
    });
    $("#addDeal").on("hidden.bs.modal", function () {
      localStorage.removeItem("post");
      setPostBody("");
      setPostId("");
      setPrice("");
      setOldPrice("");
      setDiscount("");
      setModes("");
      setValidTill("");
      setPostType("");
      setFoodIncluded([]);
      setExceptFor([]);
      setEdit(false);
      setImageURLS([]);
    });
  }, []);

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
  }, [postType]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const date = validTill.toString();
    let [m, d, y] = date.slice(4, date.indexOf(":") - 3).split(" ");
    const months = {
      January: "01",
      February: "02",
      March: "03",
      April: "04",
      May: "05",
      June: "06",
      July: "07",
      August: "08",
      September: "09",
      October: "10",
      November: "11",
      December: "12",
    };

    const obj =
      postType === "Deal"
        ? {
            creator: "Restaurant",
            dealPrice: price,
            validOn: modes,
            dealItems: [...foodIncluded],
            postBy: user._id,
            postBody,
            postType,
            oldPrice,
            validTill: `${d}-${months[m]}-${y}`,
            images: imageURLS,
          }
        : {
            creator: "Restaurant",
            validOn: modes,
            dealItems: [...foodIncluded],
            postBy: user._id,
            discount,
            exceptFor: [...exceptFor],
            postBody,
            postType,
            validTill: `${d}-${months[m]}-${y}`,
            images: imageURLS,
          };
    const obj1 =
      edit && postType === "Deal"
        ? {
            dealPrice: price,
            validOn: modes,
            dealItems: [...foodIncluded],
            postBody,
            oldPrice,
            validTill,
            images: imageURLS,
          }
        : {
            validOn: modes,
            dealItems: [...foodIncluded],
            discount,
            exceptFor: [...exceptFor],
            postBody,
            validTill,
            images: imageURLS,
          };
    const response = edit
      ? await updatePost(postId, obj1)
      : await submitPost(obj);
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

  const validModes = [
    "Dine-in only",
    "Takeaway only",
    "Delivery only",
    "Dine-in, Takeaway",
    "Dine-in, Delivery",
    "Takeaway, Delivery",
    "Dine-in, Takeaway, Delivery",
  ];

  return (
    <React.Fragment>
      <EditorPopup
        id="addDeal"
        postBody={postBody}
        setPostBody={setPostBody}
        edit={edit}
        label="deal or discount"
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
                value={postType}
                list="type"
                className="expand hand-icon mr-2"
                data-toggle="tooltip"
                data-placement="top"
                title="Deal or Discount"
                disabled={edit}
                onChange={({ target }) => setPostType(target.value)}
              />
              <datalist id="type">
                <option value="Deal" />
                <option value="Discount" />
              </datalist>
              {postType === "Deal" && (
                <DealType
                  oldPrice={oldPrice}
                  price={price}
                  setOldPrice={setOldPrice}
                  setPrice={setPrice}
                />
              )}
              {postType === "Discount" && (
                <DiscountType discount={discount} setDiscount={setDiscount} />
              )}
              {postType.length > 0 && (
                <React.Fragment>
                  <input
                    type="text"
                    value={modes}
                    list="modes"
                    className="expand tick-icon mr-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={`${postType} valid on`}
                    onChange={({ target }) => setModes(target.value)}
                  />
                  <datalist id="modes">
                    {validModes.map((mode, i) => (
                      <option key={i} value={mode} />
                    ))}
                    );
                  </datalist>
                  <span
                    className="mr-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={`${postType} valid till`}
                  >
                    <DatePicker
                      dateFormat="dd-MM-yyyy"
                      className="expand up-icon"
                      selected={validTill}
                      onChange={(date) => setValidTill(date)}
                    />
                  </span>
                  <span data-toggle="modal" data-target="#dealFoodsPopup">
                    <input
                      type="text"
                      className="dec eat-icon mr-2"
                      data-toggle="tooltip"
                      data-placement="top"
                      title={`Select food items included in ${postType}`}
                    />
                  </span>
                  {postType === "Discount" && (
                    <span data-toggle="modal" data-target="#discountFoodsPopup">
                      <input
                        type="text"
                        className="dec food-cross-icon mr-2"
                        data-toggle="tooltip"
                        data-placement="top"
                        title={`Select food items NOT included in ${postType}`}
                      />
                    </span>
                  )}
                </React.Fragment>
              )}
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
      {foodOptions.length > 0 && (
        <React.Fragment>
          <MultiSelect
            options={foodOptions}
            id="dealFoodsPopup"
            setOutput={setFoodIncluded}
            label="Select food items"
            value={edit ? foodIncluded : undefined}
            edit={edit}
          />

          <MultiSelect
            options={foodOptions}
            setOutput={setExceptFor}
            id="discountFoodsPopup"
            label="Select food items NOT included in discount"
            value={edit ? exceptFor : undefined}
            edit={edit}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default AddDealPopup;
