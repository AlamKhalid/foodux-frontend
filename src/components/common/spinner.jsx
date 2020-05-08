import React from "react";
import DotLoader from "react-spinners/DotLoader";

const Spinner = () => {
  return (
    <div className="d-flex full-display justify-content-center align-items-center">
      <DotLoader size={100} color={"#000"} loading={true} />
    </div>
  );
};

export default Spinner;
