import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('')

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

    const person = persons.find(p => p.name === newName)

    if (person) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
          .update(person.id, { ...person, number: newNumber })
          .then(updatedPerson => {
            createNotification(
              `Updated the number of ${updatedPerson.name}`, 'success'
            )
            setPersons(persons.map(p => p.id !== person.id ? p : updatedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(err => {
            const message = err.response.data.err
            createNotification(message, 'error')
            setNewName('')
            setNewNumber('')

            // Remove the non-existing person
            if (!persons.find(p => p.id === person.id)) {
              setPersons(persons.filter(p => p.id !== person.id)) 
            }
          })
      }
    } else {
      const personObject = { 
        name: newName,
        number: newNumber
      }

      personService.create(personObject)
        .then(returnedPerson => {
          createNotification(`Added ${returnedPerson.name}`, 'success')
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(err => {
          const message = err.response.data.err
          createNotification(message, 'error')
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

  const handleDeleteButtonClick = id => {
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          createNotification(`Deleted ${person.name}`, 'success')
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const createNotification = (message, messageType) => {
    setMessage(message)
    setMessageType(messageType)
    setTimeout(() => {
      setMessage('')
      setMessageType('')
    }, 5000)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification 
        message={message}
        messageType={messageType}
      />

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
      <Persons 
        persons={filteredPersons}
        onButtonDeleteClick={handleDeleteButtonClick} 
      />
    </div>
  )
}

export default App