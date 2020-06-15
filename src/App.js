import React, { Component } from "react";
import axios from "axios";

//Lib
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

//Components
import Search from "./components/Search";
import Current from "./components/Current";
import Forecast from "./components/Forecast";
import Error from "./pages/Error";

//Styles
import "./sass/_base.scss";

export class App extends Component {
  state = {
    apiCurrent:
      "https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=",
    apiForecast: "https://api.openweathermap.org/data/2.5/onecall?",
    key: process.env.REACT_APP_WEATHER_API_KEY,
    currentData: null,
    forecastData: null,
    cityName: "",
    countryCode: "",
    error: false,
  };
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getCurrentPos);
  }
  getCurrentPos = (position) => {
    let currentUrl =
      this.state.apiCurrent +
      this.state.key +
      "&lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude;

    this.getCurrentWeather(currentUrl);
  };
  getCurrentWeather = (url) => {
    axios
      .get(url)
      .then((res) =>
        this.setState(
          {
            currentData: res.data,
            cityName: res.data.name,
            countryCode: res.data.sys.country,
            lat: res.data.coord.lat,
            lon: res.data.coord.lon,
          },
          function () {
            const { apiForecast, lat, lon, key } = this.state;
            let forecastUrl =
              apiForecast +
              "lat=" +
              lat +
              "&lon=" +
              lon +
              "&units=metric&exclude=current&appid=" +
              key;
            this.getForecastWeather(forecastUrl);
          }
        )
      )
      .catch((err) => {
        this.setState({
          error: true,
        });
      });
  };
  getForecastWeather = (url) => {
    axios.get(url).then((res) =>
      this.setState({
        forecastData: res.data.daily,
      })
    );
  };
  changeCity = (city) => {
    const { apiCurrent, key } = this.state;
    let currentUrl = apiCurrent + key + "&q=" + city;
    this.getCurrentWeather(currentUrl);
    document.querySelector(".reset-pos").classList.remove("hidden");
    this.setState({
      currentData: null,
      forecastData: null,
      error: false,
    });
  };
  resetPosition = () => {
    navigator.geolocation.getCurrentPosition(this.getCurrentPos);
    document.querySelector(".reset-pos").classList.add("hidden");
    this.setState({
      currentData: null,
      forecastData: null,
      error: false,
    });
  };
  render() {
    const {
      currentData,
      forecastData,
      cityName,
      countryCode,
      error,
    } = this.state;
    const today = dayjs().format("dddd MMMM DD");
    if (!currentData && !error || !forecastData && !error) {
      return (
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} spin />
          <h2>Loading...</h2>
        </div>
      );
    } else if (error) {
      return (
        <div className="weather-container">
          <Search changeCity={this.changeCity} />
          <div className="reset-pos">
            <span onClick={this.resetPosition}>Reset position</span>
          </div>
          <Error />
        </div>
      );
    } else {
      return (
        <div className="weather-container">
          <Search changeCity={this.changeCity} />
          <div className="reset-pos">
            <span onClick={this.resetPosition}>Reset position</span>
          </div>
          <h1>
            {cityName}, {countryCode}
          </h1>
          <h2 className="app-date">{today}</h2>
          <Current data={currentData} />
          <div className="forecast">
            <Forecast data={forecastData} />
          </div>
        </div>
      );
    }
  }
}

export default App;
