import React from "react";

const HomeCard = ({ title, label, img }) => {
  return (
    <div className="col-lg-4 col-md-12 mb-lg-0 mb-4">
      <div className="card">
        <img
          className="card-img-top"
          src={img}
          alt=""
          style={{ height: "300px" }}
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{label}</p>
          <button href="#" className="btn foodux-btn">
            Visit<i className="fa fa-chevron-right ml-3"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
