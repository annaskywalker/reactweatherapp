import React from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const Daily = ({ daily }) => {
  const { day } = daily.temp;
  const { description, icon } = daily.weather[0];
  let timestamp = new Date(daily.dt * 1000);
  let date = dayjs(timestamp).format("ddd MMMM DD");

  return (
    <div className="daily">
      <div className="content">
        <p>{date}</p>
        <p className="temp">{Math.round(day)}°</p>
        <div className="icon">
          <img src={require("../icons/" + icon + ".png")} alt="weather-icon" />
        </div>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

Daily.propTypes = {
  daily: PropTypes.shape({
    temp: PropTypes.shape({
      day: PropTypes.number,
    }),
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        icon: PropTypes.string,
      })
    ),
    dt: PropTypes.number,
  }),
};

export default Daily;
