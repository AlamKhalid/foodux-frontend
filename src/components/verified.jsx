import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import FillDetails from "./fillDetails";

const Verified = ({ user }) => {
  const [fillDetails, setFillDetails] = useState(false);
  const detailsFilled = localStorage.getItem("filledDetails").length > 0;

  return (
    <React.Fragment>
      {fillDetails ? (
        <FillDetails user={user} />
      ) : (
        <React.Fragment>
          <div className="text-center">
            <i
              style={{ color: "#7aed7d" }}
              className="fa fa-check-circle i-lg"
            ></i>
            <h2 className="text-uppercase">your email has been verified</h2>
          </div>
          <br />
          {detailsFilled ? (
            <div className="text-center">
              <NavLink className="btn foodux-btn" to="/newsfeed">
                Newsfeed<i className="fa fa-chevron-right ml-3"></i>
              </NavLink>
            </div>
          ) : (
            <h5
              className="text-center text-uppercase foodux-link"
              onClick={() => {
                setFillDetails(true);
              }}
            >
              click here to get started
            </h5>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Verified;
