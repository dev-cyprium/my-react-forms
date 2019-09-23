import React, { Fragment } from "react";
import "./textinput.css";

export class TextInput extends React.Component {
  state = {
    input: "",
    dirty: false,
    valid: false,
    errors: []
  };

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

  validate() {
    if (this.state.dirty) {
      if (this.props.required) {
        this.validateRequired();
      }

      if (this.props.pattern) {
        this.validateRegex();
      }
    }
  }

  validateRegex() {
    if (this.state.input.match(this.props.pattern)) {
      this.setState({
        ...this.state,
        valid: true,
        errors: [
          ...this.state.errors.filter(err => err !== "field must be formatted")
        ]
      });
    } else {
      if (this.state.errors.includes("field must be formatted")) return;
      this.setState({
        ...this.state,
        valid: false,
        errors: [...this.state.errors, "field must be formatted"]
      });
    }
  }

  validateRequired() {
    if (this.state.input.trim() === "") {
      // Spread operator
      // { input: this.state.input, dirty: this.state.dirty, valid: false }
      this.setState({
        ...this.state,
        valid: false,
        errors: [...this.state.errors, "field is required"]
      });
    } else {
      this.setState({
        ...this.state,
        valid: true,
        errors: [
          ...this.state.errors.filter(err => err !== "field is required")
        ]
      });
    }
  }
}
