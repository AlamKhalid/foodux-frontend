import React, { useState, useEffect } from "react";
import $ from "jquery";
import { getServes } from "../services/userService";
import { submitPost, updatePost } from "../services/postService";
import { toast } from "react-toastify";
import DealType from "./dealType";
import DiscountType from "./discountType";
import MultiSelect from "./common/multiSelect";
import EditorPopup from "./editorPopup";

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
        setEdit(true);
        setPostBody(post.postBody);
        setPostId(post._id);
        setPrice(post.dealPrice);
        setOldPrice(post.oldPrice);
        setModes(post.validOn);
        setValidTill(post.validTill);
        setFoodIncluded(post.dealItems);
        setDiscount(post.discount);
        setExceptFor(post.exceptFor);
        setPostType(post.postType);
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
            validTill,
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
            validTill,
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
          }
        : {
            validOn: modes,
            dealItems: [...foodIncluded],
            discount,
            exceptFor: [...exceptFor],
            postBody,
            validTill,
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
                  <input
                    type="text"
                    value={validTill}
                    placeholder="   e.g 28-02-2020"
                    className="expand up-icon mr-2"
                    data-toggle="tooltip"
                    data-placement="top"
                    title={`${postType} valid till`}
                    onChange={({ target }) => setValidTill(target.value)}
                  />
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
