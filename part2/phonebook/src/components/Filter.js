const Filter = ({ query, onQueryChange }) => (
  <div>
    filter shown with <input 
      value={query}
      onChange={onQueryChange}
    />
  </div>
)

export default Filter