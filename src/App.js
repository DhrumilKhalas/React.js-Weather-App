// Replace the value of the 'appid' URL parameter at line number 13 with your OpenWeatherMap API key.

import React, { useState} from "react";
import axios from "axios";
import "./App.css";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=<OpenWeatherMap API key>`;

  const search = (e) => {
    if (e.key === "Enter") {
      axios
        .get(url)
        .then((response) => {
          setData(response.data);
          // console.log(response.data);
        })
        .catch((err) => {
         
           
        document.getElementById("error").style.display = "flex";

          setData("");
          setLocation("");
        });
      setLocation("");
      document.getElementById("error").style.display = "none";
    }
  };

  return (
    <>
    <div className="error" id="error" style={{display:"none"}}>
          <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity="error">Please enter a valid city name.</Alert>
          </Stack>
    </div>
      <div className="Main">
        <div className="input">
          <input
            type="text"
            placeholder="Enter a city..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyPress={search}
            className="inputinner"
          />
        </div>

        {data.name !== undefined && (
          <div className="icon">
            <img
              src="./images/icon.png"
              alt="Icon Not Found"
              className="iconInner"
            />
          </div>
        )}

        <div className="middleDiv">
          <div className="middleDivInner">
            <div className="weatherandcity">
              {data.weather ? (
                <div className="weather">{data.weather[0].main}</div>
              ) : null}
            </div>
            <div className="city">{data.name}</div>
          </div> 
 
          <div className="middleDivInner">
            {data.main ? (
              
              <div className={data.main.temp.toFixed() - 273 < 10 ? "temp" : ((data.main.temp.toFixed() - 273 < 40) ? "tempa" : "tempaa")} id="temprature">
              
                {data.main.temp.toFixed() - 273}°C
              </div>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <>
            <div className="weatherextra">
              <div className="weatherextrainner">
                <div className="weatherextrainnerheading">Feels Like</div>
                {data.main ? (
                  <div className="weatherextrainnerdetail">
                    {data.main.feels_like.toFixed() - 273}°C
                  </div>
                ) : null}
              </div>

              <div className="weatherextrainner">
                <div className="weatherextrainnerheading">Humidity</div>
                {data.main ? (
                  <div className="weatherextrainnerdetail">
                    {data.main.humidity.toFixed()}%
                  </div>
                ) : null}
              </div>

              <div className="weatherextrainner">
                <div className="weatherextrainnerheading">Wind</div>
                {data.wind ? (
                  <div className="weatherextrainnerdetail">
                    {(data.wind.speed.toFixed() * 1.609344).toFixed()} KMPH
                  </div>
                ) : null}
              </div>
            </div>
            
          </>
        )}
      </div>
      
    </>
  );
};

export default App;


