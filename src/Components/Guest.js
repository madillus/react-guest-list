import React from 'react';
import { Checkbox, IconButton, ListItem, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

function Guest({ guest, toggleComplete, removeGuest }) {
  function handleCheckboxClick() {
    toggleComplete(guest.id);
  }

  function handleRemoveClick() {
    removeGuest(guest.id);
  }
  return (
    <ListItem style={{ display: 'flex' }}>
      <Checkbox checked={guest.completed} onClick={handleCheckboxClick} />
      <Typography
        variant="body1"
        style={{
          textDecoration: guest.completed ? 'line-through' : null,
        }}
      >
        {guest.firstName}
      </Typography>
      <IconButton onClick={handleRemoveClick}>
        <CloseIcon />
      </IconButton>
    </ListItem>
  );
}

export default Guest;
