import { useState, useEffect } from 'react'
import Country from './Country'

const Countries = ({ countries }) => {
  const [shownCountries, setShownCountries] = useState([])

  useEffect(() => {
    setShownCountries(countries.map(c => false))
  }, [countries])

  const handleShowButtonClick = index => {
    const updatedShownCountries = [...shownCountries]
    updatedShownCountries[index] = !updatedShownCountries[index]
    setShownCountries(updatedShownCountries)
  }

  // Show detail of a single country
  if (countries.length === 1) {
    return <Country country={countries[0]} />
  }

  // Too many to show all of countries
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }

  return (
    <div>
      {countries.map((country, index) =>
        <div key={country.name.common}>
          {country.name.common}

          <button onClick={() => handleShowButtonClick(index)}>
            {shownCountries[index] ? 'cancel' : 'show'}
          </button>

          {shownCountries[index]
            ? <Country country={country} />
            : ''
          }
        </div>
      )}
    </div>
  )
}

export default Countries