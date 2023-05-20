import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import css from './App.module.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    setContacts(JSON.parse(localData));
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = ({ name, number }) => {
    // 'name' & 'number' from input ContactForm
    const newContact = { id: nanoid(), name, number };

    contacts.some(contact => contact.name === name)
      ? alert(`${name} is already in contacts!`)
      : setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = event => setFilter(event.currentTarget.value);

  const filterdContact = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  return (
    <div>
      <h1 className={css.text}>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2 className={css.text}>Contacts</h2>
      <p className={css.text}>Find contacts by name</p>
      <Filter changeFilter={changeFilter} filter={filter} />
      <ContactList
        onDeleteContact={deleteContact}
        contacts={filterdContact()}
      />
    </div>
  );
}

export default App;
