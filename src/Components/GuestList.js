import React from 'react';
import Guest from './Guest';
import { List } from '@material-ui/core';

function GuestList({ guestList, toggleComplete, removeGuest }) {
  return (
    <List>
      {guestList.map((guest) => (
        <Guest
          key={guest.id}
          guest={guest}
          toggleComplete={toggleComplete}
          removeGuest={removeGuest}
        />
      ))}
    </List>
  );
}

export default GuestList;
