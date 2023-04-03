import { useState } from "react";

const invalidChars = ["  ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const validChars = "0123456789abcdefghijklmnopqrstuvwxyz".split("");

const Form = () => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);

    if (invalidChars.some((invalidChar) => newName.includes(invalidChar))) {
      setNameError("Numele nu este valid");
      return;
    }
    if (newName.length > 20) {
      setNameError("Numele trebuie sa aiba mai putin de 20 de caractere");
      return;
    }
    if (newName.length < 5) {
      setNameError("Numele trebuie sa aiba mai mult de 5 de caractere");
      return;
    }

    if (nameError) setNameError("");
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    if (!validChars.includes(newEmail[0])) {
      setEmailError("Emailul nu este valid");
      return;
    }
    if (newEmail.length > 20) {
      setEmailError("Emailul trebuie sa aiba mai putin de 20 de caractere");
      return;
    }
    if (newEmail.length < 10) {
      setEmailError("Emailul trebuie sa aiba mai mult de 10 caractere");
      return;
    }
    if (!newEmail.includes("@")) {
      setEmailError("Emailul trebuie sa includa @");
      return;
    }

    if (emailError) setEmailError("");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      <h1>Un formular generic</h1>
      <div>
        <label htmlFor="name">Nume</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
        <p>{nameError}</p>
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
        ></input>
        <p>{emailError}</p>
      </div>
    </div>
  );
};

export default Form;
