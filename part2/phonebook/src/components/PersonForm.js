const PersonForm = props => (
  <form onSubmit={props.onFormSubmit}>
    <div>
      name: <input 
        value={props.newName}
        onChange={props.onNewNameChange}
      />
    </div>
    <div>
      number: <input 
        value={props.newNumber}
        onChange={props.onNewNumberChange}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

export default PersonForm