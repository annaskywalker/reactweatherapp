import React from "react";
import Daily from "./Daily";
import PropTypes from "prop-types";
import "../sass/_forecasts.scss";

const Forecast = ({ data }) => {
  return (
    data &&
    data.slice(1).map((daily, index) => <Daily key={index} daily={daily} />)
  );
};

Forecast.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Forecast;
