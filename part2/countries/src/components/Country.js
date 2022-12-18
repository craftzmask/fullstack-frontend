const Country = ({ country }) => (
  <div>
    <h2>{country.name.common}</h2>
    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <p><strong>languages:</strong></p>
    <ul>
      {Object.values(country.languages).map(language => 
        <li key={language}>{language}</li>  
      )}
    </ul>
    <img 
      src={country.flags.svg} 
      alt={`${country.name.common} flag`} 
      width="150"
    />
  </div>
)

export default Country