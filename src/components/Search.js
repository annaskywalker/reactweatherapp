import React, { Component } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import "../sass/_search.scss";

export class Search extends Component {
  state = {
    city: "",
  };

  onSearch = (e) => {
    this.setState({ city: e.target.value });
  };

  getCity = (e) => {
    e.preventDefault();
    this.props.changeCity(this.state.city);
    this.setState({ city: "" });
  };

  render() {
    return (
      <form onSubmit={this.getCity} className="search">
        <div className="search-field">
          <input
            type="text"
            name="city"
            placeholder="Search for a city..."
            value={this.state.city}
            onChange={this.onSearch}
          />
          <FontAwesomeIcon icon={faSearch} className="icon" />
        </div>
      </form>
    );
  }
}

//PropTypes
Search.propTypes = {
  changeCity: PropTypes.func.isRequired,
};

export default Search;
