import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  const filteredPersons = persons.filter(p => {
    return p.name.toLowerCase().includes(query.toLowerCase())
  })

  const handleFormSubmit = event => {
    event.preventDefault()

    const isNameExisted = persons.find(p => p.name === newName)

    if (isNameExisted) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const personObject = { 
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNewNameChange = event => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = event => {
    setNewNumber(event.target.value)
  }

  const handleQueryChange = event => {
    setQuery(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        query={query}
        onQueryChange={handleQueryChange}
      />

      <h3>add a new</h3>
      <PersonForm 
        onFormSubmit={handleFormSubmit}
        newName={newName}
        onNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        onNewNumberChange={handleNewNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App