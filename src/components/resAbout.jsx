import React from "react";
import BranchesAbout from "./branchesAbout";
import DealsAbout from "./dealsAbout";

const ResAbout = ({ userProfile }) => {
  const obj = {
    dealCount: 0,
    discountCount: 0,
    announcementCount: 0,
  };

  const dealPosts = [];
  const discountPosts = [];

  for (let i = 0; i < userProfile.posts.length; i++) {
    const { postType } = userProfile.posts[i];
    switch (postType) {
      case "Deal":
        obj.dealCount++;
        dealPosts.push(userProfile.posts[i]);
        break;
      case "Discount":
        obj.discountCount++;
        discountPosts.push(userProfile.posts[i]);
        break;
      default:
        obj.announcementCount++;
        break;
    }
  }

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
              <i className="fa fa-globe mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="Website"
              >
                {userProfile.website}
              </span>
            </span>
            <span>
              <i className="fa fa-phone mr-2"></i>
              <span
                className="foodux-link"
                data-toggle="tooltip"
                data-placement="top"
                title="UAN"
              >
                {userProfile.phone}
              </span>
            </span>
          </div>
          <div className="col-6 d-flex flex-column pl-5">
            <span className="foodux-link">
              <i className="fa fa-clipboard mr-2"></i>Total Posts:{" "}
              {userProfile.posts.length}
            </span>
            <span className="foodux-link">
              <i className="fa fa-percent mr-2"></i>Total Discounts:{" "}
              {obj.discountCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-smile-o mr-2"></i>Total Deals: {obj.dealCount}
            </span>
            <span className="foodux-link">
              <i className="fa fa-bullhorn mr-2"></i>Total Announcements:{" "}
              {obj.announcementCount}
            </span>
          </div>
        </div>
      </div>
      <div className="bg-light rounded-lg mt-3 pt-2 text-center">
        <h5
          className="font-weight-bolder pb-3 mt-2 w-50 mx-auto"
          style={{ borderBottom: "1px solid black", letterSpacing: "5px" }}
        >
          MENU
        </h5>
        <img src={userProfile.menuPic} alt="" className="mt-2 menu-pic" />
      </div>
      <div className="bg-light rounded-lg mt-3 py-2 text-center">
        <h5
          className="font-weight-bolder pb-3 mt-2 w-50 mx-auto"
          style={{ borderBottom: "1px solid black", letterSpacing: "5px" }}
        >
          BRANCHES
        </h5>
        <BranchesAbout id="branches-profile" items={userProfile.branches} />
      </div>
      <div className="bg-light rounded-lg mt-3 py-2 text-center">
        <h5
          className="font-weight-bolder pb-3 mt-2 w-50 mx-auto"
          style={{ borderBottom: "1px solid black", letterSpacing: "5px" }}
        >
          ON GOING DEALS
        </h5>
        <DealsAbout id="deals-profile" items={dealPosts} label="deal" />
      </div>
      <div className="bg-light rounded-lg mt-3 py-2 text-center">
        <h5
          className="font-weight-bolder pb-3 mt-2 w-50 mx-auto"
          style={{ borderBottom: "1px solid black", letterSpacing: "5px" }}
        >
          ON GOING DISCOUNTS
        </h5>
        <DealsAbout
          id="discounts-profile"
          items={discountPosts}
          label="discount"
        />
      </div>
    </React.Fragment>
  );
};

export default ResAbout;
