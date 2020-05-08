import React, { Component } from "react";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {},
  };

  handleChange = ({ target }) => {
    // update the state of the component on change of any input field (text, radio, etc.)
    const { name, value } = target;
    const data = { ...this.state.data };
    _.set(data, name, value);
    this.setState({ data });
  };

  // returns the button markup
  renderButton = (label) => {
    return <button className="form-control foodux-btn">{label}</button>;
  };

  // returns the input markup, mainly for type = text
  renderInput = (type, placeholder, name) => {
    return (
      <React.Fragment>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={this.state.data[name]}
          onChange={this.handleChange}
          className="form-control text-box"
          required
        />
      </React.Fragment>
    );
  };

  // returns the radio button markup
  renderRadioButton = (name, value, label) => {
    return (
      <React.Fragment>
        <input
          className="ml-4 mr-2"
          type="radio"
          value={value}
          name={name}
          checked={this.state.data[name] === value}
          onChange={this.handleChange}
          required
        />
        <h5 className="d-inline">{label}</h5>
      </React.Fragment>
    );
  };

  // return the array of containing the days, months, or years
  generateArray = (name) => {
    let arr = [];
    const { year, month } = this.state.birthday || { year: 2020, month: 1 };

    if (name === "date") {
      const days = new Date(year, month, 0).getDate();
      for (let i = 1; i <= days; i++) {
        arr.push(i);
      }
    } else if (name === "month") for (let i = 1; i <= 12; i++) arr.push(i);
    else if (name === "year") {
      for (let i = new Date().getFullYear(); i > 1950; i--) arr.push(i);
    }
    return arr;
  };

  // returns the select markup, for birthday on sign up page
  renderSelect = (name, label) => {
    const arr = this.generateArray(name);

    return (
      <React.Fragment>
        <select
          name={`birthday.${name}`}
          onChange={this.handleChange}
          value={this.state.data.birthday[name]}
          className="form-control text-box"
          required
        >
          <option value="">{label}</option>
          {arr.map((option) => (
            <option
              key={option}
              value={typeof option === String ? option.toLowerCase() : option}
            >
              {option}
            </option>
          ))}
        </select>
      </React.Fragment>
    );
  };
}

export default Form;
