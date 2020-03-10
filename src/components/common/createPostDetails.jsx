import React, { Component } from "react";

class CreatePostDetails extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <input
          name="location"
          list="locations"
          value={this.props.location}
          className="expand location-icon mr-1"
          onChange={this.props.onChange}
        />
        <datalist id="locations">
          {this.props.cities.map(city => (
            <option key={city} value={city} />
          ))}
        </datalist>
        <input
          type="text"
          name="amountSpend"
          value={this.props.amountSpend}
          className="expand dollar-icon"
          onChange={this.props.onChange}
        />
      </React.Fragment>
    );
  }
}

export default CreatePostDetails;
