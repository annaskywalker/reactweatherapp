import React, { Component } from "react";
import axios from "axios";

//Lib
import dayjs from "dayjs";

//Components
import Search from "./components/Search";
import Current from "./components/Current";
import Forecast from "./components/Forecast";

//Styles
import "./sass/_base.scss";

export class App extends Component {
  state = {
    apiCurrent:
      "http://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=",
    apiForecast: "https://api.openweathermap.org/data/2.5/onecall?",
    key: "42845342a9a608eccd9b81cd82954d49",
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
        // what now?
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
    if (!currentData || !forecastData) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>Error.</div>;
    } else {
      return (
        <div className="weather-container">
          <Search changeCity={this.changeCity} />
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