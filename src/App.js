
import React, { useState } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloud, faBolt, faCloudRain, faCloudShowersHeavy, faSnowflake, faSun, faSmog } from '@fortawesome/free-solid-svg-icons'
import snow from './assest/snow.jpg'
import cloud from './assest/cloud.jpg'
import rain from './assest/rain.jpg'
import thder from './assest/thder.jpg'
import clear from './assest/clear.jpg'
import smog from './assest/smog.jpg'
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
  if (typeof data.main != "undefined") {
    if (data.weather[0].main === "Clouds") {
      emoji = faCloud
     
    } else if (data.weather[0].main === "Thunderstorm") {
      emoji = faBolt
     
    } else if (data.weather[0].main === "Drizzle") {
      emoji = faCloudRain
     
    } else if (data.weather[0].main === "Rain") {
      emoji = faCloudShowersHeavy
      
    } else if (data.weather[0].main === "Snow") {
      emoji = faSnowflake
      
    } else if (data.weather[0].main === "Clear") {
      emoji = faSun
      
    } else {
      emoji = faSmog
      
    }
  }

  

  return (
    <div className='app'>
      
      <div className='title'><h1>Know Your Weather</h1></div>
      <div className='search'>
        <input value={location} onChange={event => setLocation(event.target.value)} onKeyPress={searchLocation} placeholder="Enter Location" type="text" />
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <h3>{data.name}</h3>
            <div className='temp'>
              {data.main ? <h1>{((((data.main.temp) - 32) * 5) / 9).toFixed()}ºC</h1> : null}
            </div>
            <div className='description'>
              <FontAwesomeIcon icon={emoji} className="e-icon" />
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
            <div className='bottom'>
              <div className='feels'>
                {data.main ? <p className='bold'>{((((data.main.feels_like) - 32) * 5) / 9).toFixed()}ºC</p> : null}
                <p>Feels Like</p>
              </div>
              <div className='humid'>
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className='wind'>
                {data.wind ? <p className='bold'>{data.wind.speed} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default App;
