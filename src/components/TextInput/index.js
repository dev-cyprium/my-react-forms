import React, { Fragment } from "react";
import "./style.css";

export class TextInput extends React.Component {
  state = {
    input: "",
    dirty: false,
    valid: false,
    errors: []
  };

  componentDidMount() {
    this.props.registerField(this.props.name);
  }

  render() {
    return (
      <Fragment>
        {/* Like ng-container from Angular */}
        <input
          onChange={this.handleInput}
          value={this.state.input}
          placeholder={this.props.placeholder}
          className={this.getClassName()}
        />
        {this.state.errors.map((error, key) => (
          <div key={key} className="TextInput-error-text">
            {error}
          </div>
        ))}
      </Fragment>
    );
  }

  getClassName() {
    if (!this.state.valid && this.state.dirty) {
      return "TextInput-invalid";
    }
    return "";
  }

  handleInput = ev => {
    ev.persist(); // error without this!
    // ne returnuje se
    this.setState(
      () => ({
        input: ev.target.value,
        dirty: true
      }),
      () => {
        this.validate();
      }
    );
  };

  notify = () => {
    if (!this.props.name) {
      throw new Error('[name] prop is required on TextInput!');
    }

    this.props.onInputValidated(
      this.props.name,
      this.state.valid
    );
  }

  setFormError(valid, errorText) {
    if (valid) {
      this.setState(oldState => ({
        ...oldState,
        errors: [
          ...oldState.errors.filter(err => err !== errorText)
        ]
      }));
    } else {
      if (this.state.errors.includes(errorText)) return;

      this.setState(oldState => ({
        ...oldState,
        errors: [...oldState.errors, errorText]
      }));
    }
  }

  validate() {
    if (this.state.dirty) {
      if (this.props.required) {
        this.validateRequired();
      }

      if (this.props.pattern) {
        this.validateRegex();
      }

      this.setState(state => ({
        ...state,
        valid: state.errors.length === 0
      }), this.notify);
    }
  }

  validateRegex() {
      this.setFormError(
        this.props.pattern.test(this.state.input), 
        'field must be formatted');
  }

  validateRequired() {
    this.setFormError(
      this.state.input.trim() !== '', 
      'field is required')
  }
}
