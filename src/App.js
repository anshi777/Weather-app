import "./App.css";
import React, { useState } from "react";
import Axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [citynotfound, setCityNotFound] = useState(0);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=2e8c751914ed287c5c4975f77833cf7e`;

  const inputLocation = (event) => {
    if (event.key === "Enter") {
      Axios.get(url)
        .then((res) => {
          setCityNotFound(res.status);
          setData(res.data);
        })
        .catch((e) => {
          setCityNotFound(e.response.status);
        });
      setLocation("");
    }
  };

  const inputLocationbtn = () => {
    Axios.get(url)
      .then((res) => {
        setCityNotFound(res.status);
        setData(res.data);
      })
      .catch((e) => {
        setCityNotFound(e.response.status);
      });
    setLocation("");
  };

  return (
    <div className="app">
      <div className="input">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyUp={inputLocation}
          placeholder="Enter Location"
          type="text"
        />
        <button className="searchbtn" onClick={inputLocationbtn}>
          Search
        </button>
      </div>
      {citynotfound === 404 ? (
        <h1 className="errorMessage">Location Not Found!</h1>
      ) : (
        <div className="container">
          <div className="top">
            <div>
              <div className="location">
                <p>{data.name}</p>
              </div>
              <div className="temp">
                {data.main ? (
                  <h1>{Math.floor(data.main.temp - 273.15)} °C</h1>
                ) : null}
              </div>
            </div>
            <div className="description">
              {data.weather ? (
                <p className="weather_type">{data.weather[0].main}</p>
              ) : null}
            </div>
          </div>
          {data.name !== undefined && (
            <div className="bottom-box">
              <div className="bottom">
                <div className="feels">
                  {data.main ? (
                    <p className="bold">
                      {Math.floor(data.main.feels_like - 273.15)} °C
                    </p>
                  ) : null}
                  <p className="mobileview">Feels Like</p>
                </div>
                <div className="humidity">
                  {data.main ? (
                    <p className="bold">{data.main.humidity}%</p>
                  ) : null}
                  <p className="mobileview">Humidity</p>
                </div>
                <div className="wind">
                  {data.wind ? (
                    <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                  ) : null}
                  <p className="mobileview">Wind Speed</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
