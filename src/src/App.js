
import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faSmog } from '@fortawesome/free-solid-svg-icons'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=92dfe7cc934312ae04f8e710e7b3a269`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
  }

  let emoji = null;
  let weather_class = 'container';
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = faCloud
      weather_class = 'clouds'
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = faBolt
      weather_class = 'thunder'
     
    } else if (data.weather[0].main === "Drizzle") {
      emoji = faCloudRain
      weather_class = 'drizzle'
     
    } else if (data.weather[0].main === "Rain") {
      emoji = faCloudShowersHeavy
      weather_class = 'rain'
      
    } else if (data.weather[0].main === "Snow") {
      emoji = faSnowflake
      weather_class = 'snow'
      
    } else if (data.weather[0].main === "Clear") {
      emoji = faSun
      weather_class = 'clear'
      
    } else {
      emoji = faSmog
      weather_class = 'smog'
      
    }
  }

  

  return (
    <div className='app'>
      
      <div className='title'><h1>Know Your Weather</h1></div>
      <div className='search'>
        <input value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} placeholder="Enter Location" type="text" />
      </div>
      <div className={weather_class}>
        <div className='top'>
          <div className='location'>
            <h3>{data.name}</h3>
            <div className='temp'>
              {data.main ? <h1>{((((data.main.temp) - 32) * 5) / 9).toFixed()}ºC</h1>:<h1>0.0ºC</h1>}
            </div>
            <div className='description'>
              <FontAwesomeIcon icon={emoji} className="e-icon" />
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            <div className='bottom'>
              <div className='feels'>
                {data.main ? <p className='bold'>{((((data.main.feels_like) - 32) * 5) / 9).toFixed()}ºC</p> : <p>0.0ºC</p>}
                <p>Feels Like</p>
              </div>
              <div className='humid'>
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : <p>0%</p>}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : <p>0 MPH</p>}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div className='footer'>
        <p>@ADITYA DEEPAK CREATION</p>
      </div>
    </div>
  );
}

export default App;
