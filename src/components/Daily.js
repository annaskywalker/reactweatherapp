import React, { Component } from "react";
import dayjs from "dayjs";
import PropTypes from "prop-types";

export class Daily extends Component {
  render() {
    const { day } = this.props.daily.temp;
    const { description, icon } = this.props.daily.weather[0];
    let timestamp = new Date(this.props.daily.dt * 1000).toLocaleDateString();
    let date = dayjs(timestamp).format("ddd MMMM DD");

    return (
      <div className="daily">
        <div className="content">
          <p>{date}</p>
          <p className="temp">{Math.round(day)}°</p>
          <div className="icon">
            <img
              src={require("../icons/" + icon + ".png")}
              alt="weather-icon"
            />
          </div>
          <p className="description">{description}</p>
        </div>
      </div>
    );
  }
}

//PropTypes
Daily.propTypes = {
  daily: PropTypes.object.isRequired,
};

export default Daily;
