import React, {Fragment, useState} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { TextInput } from "./components/TextInput";
import { Form } from "./components/Form";

function App() {
  return (
    <Form render={ ({onInputValidated, registerField, valid}) => (
      <Fragment>
        <div>
          <label>Unesi ime: </label>
          <TextInput
            name="firstName"
            placeholder="Ime..."
            required
            pattern={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
            onInputValidated={onInputValidated}
            registerField={registerField}
          />
        </div>

        <div>
          <label>Unesi prezime: </label>
          <TextInput
            name="lastName"
            placeholder="Prezime..."
            required
            pattern={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
            onInputValidated={onInputValidated}
            registerField={registerField}
          />
        </div>

        <div>
          <button disabled={!valid}>
            Submit
          </button>
        </div>
      </Fragment>
    )}>
    </Form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
