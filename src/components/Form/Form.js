import { useState } from "react";

const invalidChars = ["  ", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const noChars = "0123456789";
const alphaChars = "abcdefghijklmnopqrstuvwxyz";

const Form = () => {
  const [name, setName] = useState("");
  const [mail, setMail] = useState("");
  const [nameError, setNameError] = useState("");
  const [mailError, setMailError] = useState("");

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

  const handleMailChange = (event) => {
    const newMail = event.target.value;
    setMail(newMail);

    if (!(noChars + alphaChars).includes(newMail[0])) {
      setMailError("Mail-ul trebuie sa inceapa cu caractere alfanumerice");
      return;
    }
    if (!newMail.includes("@")) {
      setMailError("Mail-ul trebuie sa contina un `@`");
      return;
    }
    if (!(noChars + alphaChars).includes(newMail[newMail.indexOf("@") - 1])) {
      setMailError(
        "Mail-ul trebuie sa contina caractere alfanumerice inainte de `@`"
      );
      return;
    }
    if (!(noChars + alphaChars).includes(newMail[newMail.indexOf("@") + 1])) {
      setMailError(
        "Mail-ul trebuie sa contina caractere alfanumerice dupa `@`"
      );
      return;
    }
    if (!newMail.includes(".")) {
      setMailError("Mail-ul trebuie sa contina un `.`");
      return;
    }
    if (!(noChars + alphaChars).includes(newMail[newMail.indexOf(".") + 1])) {
      setMailError(
        "Mail-ul trebuie sa contina caractere alfanumerice dupa `.`"
      );
      return;
    }
    if (mailError) setMailError("");
    console.log(newMail.indexOf("@"));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>Un formular generic</h1>
      <div>
        <label htmlFor="name">Nume</label>
        <input
          type="text"
          id="name"
          placeholder="Name..."
          value={name}
          onChange={handleNameChange}
        />
        <p>{nameError}</p>
      </div>
      <div>
        <label htmlFor="mail">E-mail</label>
        <input
          type="email"
          id="mail"
          placeholder="Mail..."
          value={mail}
          min={10}
          max={20}
          onChange={handleMailChange}
        />
        <p>{mailError}</p>
      </div>
    </div>
  );
};

export default Form;
