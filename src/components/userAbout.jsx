import React from "react";
import RestaurantsVisitedAbout from "./restaurantsVisitedAbout";

const UserAbout = ({ userProfile }) => {
  const genderIcon = userProfile.gender === "male" ? "mars" : "venus";
  const gender = userProfile.gender === "male" ? "Male" : "Female";
  const obj = {
    reviewCount: 0,
    recommendedCount: 0,
    notRecommendedCount: 0,
    whatCount: 0,
    recommendationsCount: 0,
    avgRating: 0,
  };
  for (let i = 0; i < userProfile.posts.length; i++) {
    const { postType, overallRating, opinion } = userProfile.posts[i];
    switch (postType) {
      case "Review":
        obj.reviewCount += 1;
        obj.avgRating += overallRating;
        if (opinion === "Recommended") obj.recommendedCount += 1;
        else obj.notRecommendedCount += 1;
        break;
      case "What":
        obj.whatCount += 1;
        break;
      default:
        obj.recommendationsCount += 1;
    }
  }
  obj.avgRating /= obj.reviewCount > 0 ? obj.reviewCount : 1;
  return (
    <React.Fragment>
      <div
        className="bg-light rounded-lg mt-2 mx-1 py-3 px-5"
        style={{ fontSize: "17px" }}
      >
        <div className="row">
          <div className="col-6 d-flex flex-column">
            <span>
              <i className="fa fa-user mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Name"
              >
                {userProfile.name}
              </span>
            </span>
            <span>
              <i className="fa fa-envelope mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Email"
              >
                {userProfile.email}
              </span>
            </span>
            <span>
              <i className={`fa fa-${genderIcon} mr-2`}></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Gender"
              >
                {gender}
              </span>
            </span>
            <span>
              <i className="fa fa-birthday-cake mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Birthday"
              >
                {userProfile.birthday}
              </span>
            </span>
            <span>
              <i className="fa fa-map-marker mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Lives in"
              >
                {userProfile.livesIn.name}
              </span>
            </span>
            <span>
              <i className="fa fa-cutlery mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Fav Food"
              >
                {userProfile.favFood.name}
              </span>
            </span>
            <span>
              <i className="fa fa-bank mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Fav Restaurant"
              >
                {userProfile.favRestaurant.name}
              </span>
            </span>
            <span>
              <i className="fa fa-sign-in mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Joined on"
              >
                {userProfile.joinedOn}
              </span>
            </span>
          </div>
          <div className="col-6 d-flex flex-column pl-5">
            <span className="foodux-link">
              <i className="fa fa-clipboard mr-2"></i>Total Posts:{" "}
              {userProfile.posts.length}
            </span>
            <span className="foodux-link">
              <i className="fa fa-pencil-square-o mr-2"></i>Total Reviews:{" "}
              {obj.reviewCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-thumbs-up mr-2"></i>Recommended Reviews:{" "}
              {obj.recommendedCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-thumbs-down mr-2"></i>Not Recommended Reviews:{" "}
              {obj.notRecommendedCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-star-half-o mr-2"></i>Average Reviews Rating:{" "}
              {obj.avgRating}
            </span>
            <span className="foodux-link">
              <i className="fa fa-handshake-o mr-2"></i>Asked Recommendations:{" "}
              {obj.recommendationsCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-question-circle-o mr-2"></i>What you can eat
              posts: {obj.whatCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-automobile mr-2"></i>Total Restaurants
              Visited: {userProfile.restaurantsVisited.length}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-light rounded-lg mt-3 py-2 text-center">
        <h5
          className="font-weight-bolder pb-3 mt-2 w-50 mx-auto text-uppercase"
          style={{ borderBottom: "1px solid black", letterSpacing: "5px" }}
        >
          Visited Restaurants
        </h5>
        <RestaurantsVisitedAbout
          id="restaurants-visited-profile"
          items={userProfile.restaurantsVisited}
        />
      </div>
    </React.Fragment>
  );
};

export default UserAbout;
