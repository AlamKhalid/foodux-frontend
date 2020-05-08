import React from "react";

const DealType = ({ oldPrice, price, setOldPrice, setPrice }) => {
  return (
    <React.Fragment>
      <input
        type="number"
        value={oldPrice}
        className="expand close-icon mr-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Old Price"
        onChange={({ target }) => setOldPrice(target.value)}
      />
      <input
        type="number"
        value={price}
        className="expand dollar-icon mr-2"
        data-toggle="tooltip"
        data-placement="top"
        title="Deal Price"
        onChange={({ target }) => setPrice(target.value)}
      />
    </React.Fragment>
  );
};

export default DealType;
