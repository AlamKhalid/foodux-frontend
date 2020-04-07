import React from "react";

const RightSidebar = () => {
  return (
    <div className="fixed">
      <h6 className="text-center right-box">Vote for your favourite</h6>
      <div className="right-box">
        <p>What you like the most?</p>
        <input className="mr-2" type="checkbox" name="choice" />
        <label>Fries</label> <br />
        <input className="mr-2" type="checkbox" name="choice" />
        <label>Burger</label> <br />
        <input className="mr-2" type="checkbox" name="choice" />
        <label>Pizza</label> <br />
        <button className="btn btn-outline-success">Vote</button>
      </div>
    </div>
  );
};

export default RightSidebar;
