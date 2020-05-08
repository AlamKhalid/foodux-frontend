import React, { useEffect } from "react";
import $ from "jquery";

const AboutNavOption = ({ userProfile }) => {
  const genderIcon = userProfile.gender === "male" ? "mars" : "venus";
  const gender = userProfile.gender === "male" ? "Male" : "Female";

  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip({ trigger: "hover" });
    $('[data-toggle="tooltip"]').on("click", function () {
      $(this).tooltip("hide");
    });
  });

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
              <i className="fa fa-pencil-square-o mr-2"></i>Total Reviews: 1
            </span>
            <span className="foodux-link">
              <i className="fa fa-thumbs-up mr-2"></i>Recommended Reviews: 1
            </span>
            <span className="foodux-link">
              <i className="fa fa-thumbs-down mr-2"></i>Not Recommended Reviews:
              1
            </span>
            <span className="foodux-link">
              <i className="fa fa-star-half-o mr-2"></i>Average Reviews Rating:
              1
            </span>
            <span className="foodux-link">
              <i className="fa fa-handshake-o mr-2"></i>Asked Recommendations: 1
            </span>
            <span className="foodux-link">
              <i className="fa fa-question-circle-o mr-2"></i>What you can eat
              posts: 1
            </span>
            <span className="foodux-link">
              <i className="fa fa-automobile mr-2"></i>Total Restaurants
              Visited: 1
            </span>
          </div>
        </div>
      </div>
      <div className="bg-light rounded-lg mt-3 py-2 text-center">
        <h5 className="font-weight-bolder">Visited Restaurants</h5>
      </div>
    </React.Fragment>
  );
};

export default AboutNavOption;
