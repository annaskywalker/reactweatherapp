import React from "react";
import PropTypes from "prop-types";
import "../sass/_current.scss";

const Current = ({
  temp,
  minTemp,
  maxTemp,
  humidity,
  wind,
  description,
  icon,
  sunriseTime,
  sunsetTime,
}) => {
  let sunrise = new Date(sunriseTime * 1000).toLocaleTimeString().slice(0, 5);
  let sunset = new Date(sunsetTime * 1000).toLocaleTimeString().slice(0, 5);

  return (
    <div className="current">
      <div className="base">
        <div className="icon">
          <img src={require("../icons/" + icon + ".png")} alt="weather-icon" />
        </div>
        <div className="temp">
          <h2>{Math.round(temp)}°</h2>
          <h3>{description}</h3>
        </div>
      </div>

      <div className="details">
        <div>
          <p>{Math.round(maxTemp)}°</p>
          <small>Max temp</small>
        </div>
        <div>
          <p>{Math.round(minTemp)}°</p>
          <small>Min temp</small>
        </div>
        <div>
          <p>{humidity}%</p>
          <small>Humidity</small>
        </div>
        <div>
          <p>{wind.speed}</p>
          <small>Wind speed</small>
        </div>
        <div>
          <p>{sunrise}</p>
          <small>Sunrise</small>
        </div>
        <div>
          <p>{sunset}</p>
          <small>Sunset</small>
        </div>
      </div>
    </div>
  );
};

Current.propTypes = {
  temp: PropTypes.number,
  minTemp: PropTypes.number,
  maxTemp: PropTypes.number,
  humidity: PropTypes.number,
  wind: PropTypes.shape({
    speed: PropTypes.number,
  }),
  description: PropTypes.string,
  icon: PropTypes.string,
  sunriseTime: PropTypes.number,
  sunsetTime: PropTypes.number,
};

export default Current;
