import React from "react";
import "antd/dist/antd.css";
import { Select } from "antd";

const MultiSelectAnt = ({ options, placeholder, onChange, value }) => {
  return (
    <Select
      mode="multiple"
      maxTagCount="5"
      style={{ width: "50%", textAlign: "left" }}
      allowClear={true}
      optionLabelProp="name"
      optionFilterProp="name"
      options={options}
      defaultValue={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e)}
    >
      {options.map((option) => (
        <Select.Option key={option._id} value={option.name} selected={true}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default MultiSelectAnt;
