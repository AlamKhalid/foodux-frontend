import React from "react";

const ProfileRestaurantVisited = ({ userProfile }) => {
  const deals =
    userProfile.isRestaurant &&
    userProfile.posts.filter((post) => post.postType === "Deal");
  const latestDeal =
    userProfile.isRestaurant && deals.length > 0
      ? deals[deals.length - 1]
      : null;
  const discounts =
    userProfile.isRestaurant &&
    userProfile.posts.filter((post) => post.postType === "Discount");
  const latestDiscount =
    userProfile.isRestaurant && discounts.length > 0
      ? discounts[discounts.length - 1]
      : null;
  return userProfile.isRestaurant ? (
    <React.Fragment>
      <div className="bg-light rounded-lg my-2 p-3">
        <h6
          className="text-center pb-3"
          style={{ borderBottom: "1px solid black" }}
        >
          Menu
        </h6>

        <img className="w-100" src={userProfile.menuPic} alt="" />
      </div>
      {latestDeal && (
        <div className="bg-light rounded-lg my-2 p-3">
          <h6
            className="text-center pb-3"
            style={{ borderBottom: "1px solid black" }}
          >
            Latest Deal
          </h6>
          <div className="card">
            <img className="card-img-top" src={latestDeal.images[0]} alt="" />
            <div className="card-body">
              <p className="card-text">
                Deal on:{" "}
                <span className="font-weight-bold">
                  {latestDeal.dealItems.toString()}
                </span>{" "}
                <br />
                <i className="fa fa-times mr-2"></i>
                Old Price:{" "}
                <span className="font-weight-bold">
                  Rs.{latestDeal.oldPrice}
                </span>{" "}
                <br />
                <i className="fa fa-check mr-2"></i>New Price:{" "}
                <span className="font-weight-bold">
                  Rs.{latestDeal.dealPrice}
                </span>{" "}
                <br />
                <i className="fa fa-bookmark-o mr-2"></i>Save:{" "}
                <span className="font-weight-bold">
                  Rs.{latestDeal.oldPrice - latestDeal.dealPrice}
                </span>{" "}
                <br />
                <span className="font-weight-bold label-2 text-danger">
                  <em>Expires: {latestDeal.validTill}</em>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
      {latestDiscount && (
        <div className="bg-light rounded-lg my-2 p-3">
          <h6
            className="text-center pb-3"
            style={{ borderBottom: "1px solid black" }}
          >
            Latest Discount
          </h6>
          <div className="card">
            <img
              className="card-img-top"
              src={latestDiscount.images[0]}
              alt=""
            />
            <div className="card-body">
              <p className="card-text">
                Flat{" "}
                <span className="font-weight-bold">
                  {latestDiscount.discount}%
                </span>{" "}
                off on{" "}
                <span className="font-weight-bold">
                  {latestDiscount.dealItems.toString()}
                </span>{" "}
                <br />
                <span className="font-weight-bold label-2 text-danger">
                  <em>Expires: {latestDiscount.validTill}</em>
                </span>
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  ) : (
    <React.Fragment>
      {userProfile.restaurantsVisited.length > 0 && (
        <div className="bg-light rounded-lg my-2 p-3">
          <h6
            className="text-center pb-3"
            style={{ borderBottom: "1px solid black" }}
          >
            Recently Visited Restaurant
          </h6>
          <div className="card">
            <img
              className="card-img-top"
              src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg"
              alt=""
            />
            <div className="card-body text-center">
              <h5 className="card-title">
                {userProfile.restaurantsVisited[0].restaurantId.name}
              </h5>
              <p className="card-text">
                No. of times visited: {userProfile.restaurantsVisited[0].times}
              </p>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ProfileRestaurantVisited;
