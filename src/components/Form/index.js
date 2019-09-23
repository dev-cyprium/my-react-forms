import React from 'react';

const toDynamic = (old, key, val) => {
  const newObj = {};
  newObj[key] = val;
  return Object.assign({...old}, newObj);
}

export class Form extends React.Component {
  state = {
    valid: false,
    fields: {}
  }

  onInputValidated = (name, val) => {
    this.setState(state => {
      const fields = toDynamic(state.fields, name, val);
      const valid = Object.values(fields).reduce((p, c) => p && c, true);

      return {
        ...state,
        fields,
        valid
      }
    });
  }

  registerField = (name) => {
    this.setState(state => ({
      ...state,
      fields: toDynamic(state.fields, name, false)
    }));
  }

  render() {
    return  (
      <form>
        {this.props.render({
          onInputValidated: this.onInputValidated,
          registerField: this.registerField,
          valid: this.state.valid
        })}
      </form>
    );
  }
}