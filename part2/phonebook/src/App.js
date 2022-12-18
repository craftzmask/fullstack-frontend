import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = event => {
    event.preventDefault()
    const isNameExisted = persons.find(p => p.name === newName)
    if (isNameExisted) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { name: newName }
      setPersons(persons.concat(personObject))
      setNewName('')
    }
  }

  const handleNewNameChange = event => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNewNameChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <p key={person.name}>{person.name}</p>)}
    </div>
  )
}

export default App