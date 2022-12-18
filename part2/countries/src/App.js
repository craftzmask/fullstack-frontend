import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  const filteredCountries = countries.filter(country => {
    if (query !== '') {
      const countryName = country.name.common.toLowerCase()
      return countryName.includes(query.toLowerCase())
    }
  })

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }, [])

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <Filter 
        query={query}
        onQueryChange={handleQueryChange}
      />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App