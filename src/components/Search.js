import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "../sass/_search.scss";

const Search = ({ changeCity }) => {
  const [city, setCity] = React.useState("");

  const onSearch = (e) => {
    setCity(e.target.value);
  };

  const getCity = (e) => {
    e.preventDefault();
    changeCity(city);
    setCity("");
  };

  return (
    <form onSubmit={(e) => getCity(e)} className="search">
      <div className="search-field">
        <input
          type="text"
          name="city"
          placeholder="Search for a city..."
          value={city}
          onChange={(e) => onSearch(e)}
        />
        <FontAwesomeIcon icon={faSearch} className="icon" />
      </div>
    </form>
  );
};

Search.propTypes = {
  changeCity: PropTypes.func,
};

export default Search;
