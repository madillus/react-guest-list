import React, { Component } from 'react';

const baseUrl = 'http://localhost:5000';

export class Form extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch(`${baseUrl}/`, {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="firstName">Enter your first name</label>
        <input id="firstName" name="firstName" type="text" />

        <label htmlFor="lastName">Enter your last name</label>
        <input id="lastName" name="lastName" type="text" />

        <checkBox htmlFor="Attending">Yes or No</checkBox>
        <input id="Attending" name="Attending" type="text" />

        <button>Confirm!</button>
      </form>
    );
  }
}
export default Form;
