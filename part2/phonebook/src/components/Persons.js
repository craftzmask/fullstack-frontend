const Person = ({ person }) => (
  <p>{person.name} {person.number}</p>
)

const Persons = ({ persons }) => (
  <div>
    {persons.map(p => <Person key={p.name} person={p} />)}
  </div>
)

export default Persons