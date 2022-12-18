import Country from './Country'

const Countries = ({ countries }) => {
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
      {countries.map(country => 
        <p key={country.name.common}>{country.name.common}</p>
      )}
    </div>
  )
}

export default Countries