import React, { Component } from "react";
import PropTypes from "prop-types";

import "../sass/_current.scss";

export class Current extends Component {
  state = {
    userTimezone: null
  };
  componentDidMount() {
    this.setState({
      userTimezone: this.props.data.timezone
    })
  }
  render() {
    const { temp, temp_min, temp_max, humidity } = this.props.data.main;
    const { speed } = this.props.data.wind;
    const { description, icon } = this.props.data.weather[0];

    let calcSunrise = this.props.data.sys.sunrise + this.props.data.timezone;
    let sunrise = new Date((calcSunrise - this.state.userTimezone) * 1000).toLocaleTimeString().slice(0,5);

    let calcSunset = this.props.data.sys.sunset + this.props.data.timezone;
    let sunset = new Date((calcSunset - this.state.userTimezone) * 1000).toLocaleTimeString().slice(0,5);

    return (
      <div className="current">
        <div className="base">
          <div className="icon">
            <img
              src={require("../icons/" + icon + ".png")}
              alt="weather-icon"
            />
          </div>
          <div className="temp">
            <h2>{Math.round(temp)}°</h2>
            <h3>{description}</h3>
          </div>
        </div>

        <div className="details">
          <div>
            <p>{Math.round(temp_max)}°</p>
            <small>Max temp</small>
          </div>
          <div>
            <p>{Math.round(temp_min)}°</p>
            <small>Min temp</small>
          </div>
          <div>
            <p>{humidity}%</p>
            <small>Humidity</small>
          </div>
          <div>
            <p>{speed}</p>
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
  }
}

//PropTypes
Current.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Current;
