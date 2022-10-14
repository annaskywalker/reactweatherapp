import React from "react";
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

const App = () => {
  const apiCurrent =
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&APPID=";
  const apiForecast = "https://api.openweathermap.org/data/2.5/onecall?";
  const key = process.env.REACT_APP_WEATHER_API_KEY;
  const today = dayjs().format("dddd MMMM DD");
  const [current, setCurrent] = React.useState(null);
  const [forecast, setForecast] = React.useState(null);
  const [cityName, setCityName] = React.useState("");
  const [countryCode, setCountryCode] = React.useState("");
  const [error, setError] = React.useState(false);
  const resetButton = React.useRef();

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(getCurrentPos);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCurrentPos = (position) => {
    let currentUrl =
      apiCurrent +
      key +
      "&lat=" +
      position.coords.latitude +
      "&lon=" +
      position.coords.longitude;

    getCurrentWeather(currentUrl);
  };
  const getCurrentWeather = (url) => {
    axios
      .get(url)
      .then((res) => setWeatherData(res))
      .catch((err) => {
        setError(true);
      });
  };
  const setWeatherData = (res) => {
    setCurrent(res.data);
    setCityName(res.data.name);
    setCountryCode(res.data.sys.country);
    let forecastUrl =
      apiForecast +
      "lat=" +
      res.data.coord.lat +
      "&lon=" +
      res.data.coord.lon +
      "&units=metric&exclude=current&appid=" +
      key;
    getForecastWeather(forecastUrl);
  };
  const getForecastWeather = (url) => {
    axios.get(url).then((res) => setForecast(res.data.daily));
  };
  const changeCity = (city) => {
    let currentUrl = apiCurrent + key + "&q=" + city;
    getCurrentWeather(currentUrl);
    resetButton.current.classList.remove("hidden");
    setCurrent(null);
    setForecast(null);
    setError(false);
  };
  const resetPosition = () => {
    navigator.geolocation.getCurrentPosition(getCurrentPos);
    resetButton.current.classList.add("hidden");
    setCurrent(null);
    setForecast(null);
    setError(false);
  };

  return !current && !forecast && !error ? (
    <div className="loading">
      <FontAwesomeIcon icon={faSpinner} spin />
      <h2>Loading...</h2>
    </div>
  ) : error ? (
    <div className="weather-container">
      <Search changeCity={changeCity} />
      <div className="reset-pos" ref={resetButton}>
        <button onClick={() => resetPosition()}>Reset position</button>
      </div>
      <Error />
    </div>
  ) : (
    <div className="weather-container">
      <Search changeCity={changeCity} />
      <div className="reset-pos" ref={resetButton}>
        <button onClick={() => resetPosition()}>Reset position</button>
      </div>
      <h1>
        {cityName}, {countryCode}
      </h1>
      <h2 className="app-date">{today}</h2>
      <Current
        temp={current.main.temp}
        minTemp={current.main.temp_min}
        maxTemp={current.main.temp_max}
        humidity={current.main.humidity}
        wind={current?.wind}
        description={current.weather?.[0]?.description}
        icon={current.weather?.[0]?.icon}
        sunriseTime={current.sys.sunrise}
        sunsetTime={current.sys.sunset}
      />
      <div className="forecast">
        <Forecast data={forecast} />
      </div>
    </div>
  );
};
export default App;
