import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      .then(response => setWeather(response.data)) 
  }, [])

  if (!weather) {
    return <></>
  }

  return (
    <div>
      <div>temperature {weather.main.temp} Celcius</div>
      <img 
        src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt={weather.description} />
      <div>wind {weather.wind.speed} m/s</div>
    </div>
  )
}

export default Weather