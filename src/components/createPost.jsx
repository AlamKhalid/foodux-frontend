import React, { Component } from "react";
import AddReviewPopup from "./addReviewPopup";
import AddDealPopup from "./addDealPopup";
import AddAnnouncementPopup from "./addAnnouncementPopup";
import AddAskRecommendationPopup from "./addAskRecommendationPopup";
import WhatYouCanEatPopup from "./whatYouCanEatPopup";

class CreatePost extends Component {
  render() {
    const { user } = this.props;
    return this.props.user.isRestaurant ? (
      <React.Fragment>
        <div className="bg-light p-2 rounded-lg">
          <h6 className="text-left text-muted py-1 pl-2">Add Post</h6>
          <div className="create-post-body d-flex align-items-center justify-content-around">
            <span
              className="foodux-link"
              data-toggle="modal"
              data-target="#addDeal"
            >
              Add a Deal/Discount
            </span>
            <span>|</span>
            <span
              className="foodux-link"
              data-toggle="modal"
              data-target="#addAnnouncement"
            >
              Make Announcement
            </span>
          </div>
        </div>
        <AddDealPopup user={user} />
        <AddAnnouncementPopup user={user} />
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="bg-light p-2 rounded-lg">
          <h6 className="text-left text-muted py-1 pl-2">Create Post</h6>
          <div className="create-post-body d-flex align-items-center justify-content-between">
            <span
              className="foodux-link"
              data-toggle="modal"
              data-target="#addReview"
            >
              Add Review
            </span>
            <span>|</span>
            <span
              className="foodux-link"
              data-toggle="modal"
              data-target="#addRecommendation"
            >
              Ask Recommendations
            </span>
            <span>|</span>
            <span
              className="foodux-link"
              data-toggle="modal"
              data-target="#addWhat"
            >
              What you can eat in?
            </span>
          </div>
        </div>
        <AddReviewPopup user={user} />
        <AddAskRecommendationPopup user={user} />
        <WhatYouCanEatPopup user={user} />
      </React.Fragment>
    );
  }
}

export default CreatePost;
