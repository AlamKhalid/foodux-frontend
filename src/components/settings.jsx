import React, { useState, useEffect } from "react";
import _ from "lodash";
import Navbar from "./navbar";
import BasicSettings from "./basicSettings";
import { getUser } from "./../services/userService";
import Spinner from "./common/spinner";
import ProfileSettings from "./profileSettings";
import { getCities } from "./../services/cityService";
import { getRestaurants } from "./../services/restaurantService";
import { getFoods } from "./../services/foodService";
import ChangePassword from "./changePassword";
import SavedPosts from "./savedPosts";

const Settings = ({ user }) => {
  const [fullUser, setFullUser] = useState({});
  const [cities, setCities] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    async function getData() {
      const { data: city } = await getCities();
      setCities(city);
      const { data: res } = await getRestaurants();
      setRestaurants(res);
      const { data: food } = await getFoods();
      setFoods(food);
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(user)) {
        const { data: userObj } = await getUser(user._id);
        setFullUser(userObj);
      }
    }
    getData();
  }, [user]);

  return (
    <React.Fragment>
      {_.isEmpty(user) || _.isEmpty(fullUser) ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Navbar user={user} />
          <div className="container my-5 px-5">
            <div id="accordion">
              <div className="card">
                <div className="card-header" id="basic-settings">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Basic Settings
                    </button>
                  </h5>
                </div>
                <BasicSettings user={fullUser} setUser={setFullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="profile-settings">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Profile Settings
                    </button>
                  </h5>
                </div>
                <ProfileSettings
                  user={fullUser}
                  cities={cities}
                  restaurants={restaurants}
                  foods={foods}
                  setUser={setFullUser}
                />
              </div>
              <div className="card">
                <div className="card-header" id="change-password">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Change Password
                    </button>
                  </h5>
                </div>
                <ChangePassword user={user} setUser={setFullUser} />
              </div>
              <div className="card">
                <div className="card-header" id="saved-posts">
                  <h5 className="mb-0">
                    <button
                      className="btn foodux-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Saved Posts
                    </button>
                  </h5>
                </div>
                <SavedPosts />
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Settings;
