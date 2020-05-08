import React from "react";

const DiscountType = ({ discount, setDiscount }) => {
  return (
    <input
      type="number"
      placeholder="   e.g 30%"
      value={discount}
      className="expand close-icon mr-2"
      data-toggle="tooltip"
      data-placement="top"
      title="How much discount"
      onChange={({ target }) => setDiscount(target.value)}
    />
  );
};

export default DiscountType;
