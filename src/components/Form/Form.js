import { useState } from 'react';

const invalidChars = ['  ', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Form = () => {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleNameChange = event => {
    const newName = event.target.value;
    setName(newName);

    if (invalidChars.some(invalidChar => newName.includes(invalidChar))) {
      setNameError('Numele nu este valid');
      return;
    }
    if (newName.length > 20) {
      setNameError('Numele trebuie sa aiba mai putin de 20 de caractere');
      return;
    }
    if (newName.length < 5) {
      setNameError('Numele trebuie sa aiba mai mult de 5 de caractere');
      return;
    }
    if (nameError) setNameError('');
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <h1>Un formular generic</h1>
      <div>
        <label htmlFor="name">Nume</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <p>{nameError}</p>
      </div>
    </div>
  );
};

export default Form;
