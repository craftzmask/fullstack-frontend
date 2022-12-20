import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
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

      personService.create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
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