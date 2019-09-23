import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { TextInput } from "./TextInput";

function App() {
  return (
    <div>
      <div>
        <label>Unesi ime: </label>
        <TextInput
          name="firstName"
          placeholder="Ime..."
          required
          pattern={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
        />
      </div>

      <div>
        <label>Unesi prezime: </label>
        <TextInput
          name="lstName"
          placeholder="Prezime..."
          required
          pattern={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
        />
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
