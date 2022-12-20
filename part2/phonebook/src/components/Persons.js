const Person = ({ person, onButtonDeleteClick }) => (
  <div>
    {person.name} {person.number}
    <button onClick={() => onButtonDeleteClick(person.id)}>
      delete
    </button>
  </div>
)

const Persons = ({ persons, onButtonDeleteClick }) => (
  <div>
    {persons.map(p => 
      <Person 
        key={p.name}
        person={p}
        onButtonDeleteClick={onButtonDeleteClick}
      />
    )}
  </div>
)

export default Persons