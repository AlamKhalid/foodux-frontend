import React, { useState } from "react";

const Branches = ({ branch }) => {
  const [show, setShow] = useState(false);

  return (
    <React.Fragment>
      <span
        className="fit-width foodux-link pr-1"
        onClick={() => setShow(!show)}
      >
        <i className={`fa fa-caret-${show ? "down" : "right"} mr-2`}></i>
        {branch.city}
      </span>
      <br />
      {show && <span className="ml-5">{branch.subareas.toString()}</span>}
    </React.Fragment>
  );
};

export default Branches;
