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
  timezone,
}) => {
  const [sunrise, setSunrise] = React.useState(null);
  const [sunset, setSunset] = React.useState(null);

  React.useEffect(() => {
    const getTimes = (time, zone) => {
      const offset = new Date().getTimezoneOffset() * 60;
      if (offset > 0) {
        const calc = time + (zone + offset);
        return new Date(calc * 1000).toLocaleTimeString().slice(0, 5);
      } else {
        const calc = time + (zone - Math.abs(offset));
        return new Date(calc * 1000).toLocaleTimeString().slice(0, 5);
      }
    };
    setSunrise(getTimes(sunriseTime, timezone));
    setSunset(getTimes(sunsetTime, timezone));
  }, [sunriseTime, sunsetTime, timezone]);

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
  timezone: PropTypes.number,
};

export default Current;
