import React, { Component } from "react";
import _ from "lodash";

class Form extends Component {
  state = {
    data: {}
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    const data = { ...this.state.data };
    _.set(data, name, value);
    this.setState({ data });
  };

  renderButton = (label, id) => {
    return (
      <button className="form-control" id={id}>
        {label}
      </button>
    );
  };

  renderInput = (type, placeholder, name, error) => {
    return (
      <React.Fragment>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          value={this.state.data[name]}
          onChange={this.handleChange}
          className="form-control text-box"
          required
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </React.Fragment>
    );
  };

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

  generateArray = name => {
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

  renderSelect = (name, label) => {
    const arr = this.generateArray(name);

    return (
      <React.Fragment>
        <select
          name={`birthday.${name}`}
          onChange={this.handleChange}
          value={this.state.data.birthday[name]}
          className="form-control text-box"
        >
          <option value="none">{label}</option>
          {arr.map(option => (
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
