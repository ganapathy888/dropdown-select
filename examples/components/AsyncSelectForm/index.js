import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { AsyncSelect } from '../../../src';

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.fetchOptions = this.fetchOptions.bind(this);
    this.renderField = this.renderField.bind(this);
  }

  // Handlers
  fetchOptions(value) {
    return new Promise((resolve, reject) => (
      setTimeout(function() {
        const arr = [
          { id: 'Yello', name: 'Banana' },
          { id: 'Red', name: 'Apple' },
          { id: 'Orange', name: 'Orange' },
        ];
        resolve(arr);
      }, 1000)
    ));
  }

  handleSubmit(values) {
    console.log(values);
    this.props.reset();
  }

  renderField(field) {
    return (
      <AsyncSelect
        value={field.input.value}
        onChange={(value) => field.input.onChange(value)}
        fetchOptions={this.fetchOptions}
        labelKey="name"
        valueKey="id"
        />
    );
  }

  // Render
  render() {
    const { handleSubmit } = this.props
    return (
      <form onSubmit={ handleSubmit(this.handleSubmit) }>
        <Field
          name="fruit"
          component={this.renderField}
          />
        <button className="btn btn-primary mt-2" type="submit">Submit</button>
      </form>
    );
  }
}

const ReduxContactForm = reduxForm({
  // a unique name for the form
  form: 'contact'
})(ContactForm)

export default ReduxContactForm;