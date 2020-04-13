import React, { useState, useEffect } from "react";
import _ from "lodash";
import { getUser } from "../services/userService";

const Verify = ({ user }) => {
  const [isVerified, setIsVerified] = useState("false");

  useEffect(() => {
    async function getData() {
      if (!_.isEmpty(user)) {
        const { data: userObj } = await getUser(user._id);
        setIsVerified(userObj.isVerified);
      }
    }
    getData();
  }, [user]);

  return isVerified ? (
    <React.Fragment>
      <div className="text-center">
        <i style={{ color: "#7aed7d" }} className="fa fa-check-circle i-lg"></i>
        <h2 className="text-uppercase">your email has been verified</h2>
      </div>
      <br />
      <div className="text-center">
        <h5
          className="text-uppercase foodux-link"
          onClick={() => {
            window.location = "/home";
          }}
        >
          go to newsfeed
        </h5>
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="text-center">
        <i
          style={{ color: "#ffd48b" }}
          className="fa fa-question-circle-o i-lg"
        ></i>
        <h2 className="text-uppercase verify-heading">verify your email</h2>
      </div>
      <br />
      <div className="text-center">
        <h5 className="text-uppercase">a verification email has been sent</h5>
        <p className="text-uppercase">please check you inbox</p>
      </div>
    </React.Fragment>
  );
};

export default Verify;
