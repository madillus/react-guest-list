import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@material-ui/core';

function GuestForm({ addGuest }) {
  const [guest, setGuest] = useState({
    id: '',
    firstName: '',
    completed: false,
  });

  function handleFirstNameInputChange(e) {
    setGuest({
      ...guest,
      firstName: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (guest.firstName.trim()) {
      addGuest({ ...guest, id: uuidv4() });
      setGuest({ ...guest, firstName: '' });
    }
  }

  return (
    <form className="guest-form" onSubmit={handleSubmit}>
      <TextField
        label="FirstName"
        type="text"
        name="firstName"
        value={guest.firstName}
        onChange={handleFirstNameInputChange}
      />

      <Button type="submit">Submit</Button>
    </form>
  );
}

export default GuestForm;
