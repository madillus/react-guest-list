import React from 'react';
import { Checkbox, IconButton, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import FormControlLabel from '@material-ui/core/FormControlLabel';

function Guest({ guest, toggleComplete, removeGuest }) {
  function handleCheckboxClick() {
    toggleComplete(guest.id);
  }

  function handleRemoveClick() {
    removeGuest(guest.id);
  }
  return (
    <ListItem style={{ display: 'flex' }}>
      <FormControlLabel
        checked={guest.completed}
        labelPlacement="start"
        label={
          <Typography style={{ fontSize: 16 }}>
            To confirm attendence please check the box.
          </Typography>
        }
        control={<Checkbox value="completed" color="primary" />}
        onClick={handleCheckboxClick}
      />
      <Typography
        variant="body3"
        style={{
          textDecoration: guest.completed ? 'underline' : null,
        }}
      >
        {guest.firstName} {guest.lastName}
      </Typography>
      <IconButton onClick={handleRemoveClick}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  );
}

export default Guest;
