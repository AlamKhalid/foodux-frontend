import React from "react";

const ProfileRestaurantVisited = ({ userProfile }) => {
  return (
    userProfile.restaurantsVisited.length > 0 && (
      <div className="bg-light rounded-lg my-3 p-3">
        <h6>Recently Visited Restaurants</h6> <hr />
        <div className="row text-center">
          <div className="col-6">
            {userProfile.restaurantsVisited[0].restaurantId.name}
          </div>
        </div>
      </div>
    )
  );
};

export default ProfileRestaurantVisited;
