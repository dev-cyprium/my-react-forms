import React, { Fragment } from "react";
import { Form, FormConsumer } from "../../components/Form";
import { TextInput } from "../../components/TextInput";
import { ModalConsumer, MessageModal, ErrorModal } from "../../components/Modal";

const SubmitButton = () => (
  <FormConsumer>
  {({valid}) => (
    <button disabled={!valid}>
      Submit
    </button>
  )}
  </FormConsumer>
);


export const Home = () => (
  <Form>
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
        />
      </div>

      <div>
        <label>Unesi prezime: </label>
        <TextInput
          name="lastName"
          placeholder="Prezime..."
          required
          pattern={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
        />
      </div>

      <div>
        <SubmitButton />
      </div>
    </Fragment>
  </Form>
); 