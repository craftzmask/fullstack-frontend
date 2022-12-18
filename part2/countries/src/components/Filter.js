const Filter = ({ query, onQueryChange }) => (
  <div>
    find countries <input
      value={query}
      onChange={onQueryChange}
    />
  </div>
)

export default Filter