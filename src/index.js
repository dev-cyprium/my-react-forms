import React, {Fragment} from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import { TextInput } from "./components/TextInput";
import { Form } from "./components/Form";

import {ModalProvider, ModalRoot, MessageModal, ModalConsumer, ErrorModal} from './components/Modal'

function App() {
  return (
    <Form render={ ({onInputValidated, registerField, valid}) => (
      <Fragment>
        
        <ModalConsumer>
          {({showModal}) => (
            <button type="button" onClick={() => showModal(MessageModal)}>
              Open Modal
            </button>
          )}
        </ModalConsumer>

        <ModalConsumer>
          {(manager) => (
            <button type="button" onClick={() => manager.showModal(ErrorModal)}>
              Open Error Modal
            </button>
          )}
        </ModalConsumer>

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
ReactDOM.render(
  <ModalProvider>
    <App />
  </ModalProvider>
, rootElement);
