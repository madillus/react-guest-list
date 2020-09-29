import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import './App.css';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';

const LOCAL_STORAGE_KEY = 'react-guest-list-guestList';

function App() {
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    // fires when app component mounts to the DOM
    const storageGuestList = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY),
    );
    if (storageGuestList) {
      setGuestList(storageGuestList);
    }
  }, []);

  useEffect(() => {
    // fires when guestList array gets updated
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(guestList));
  }, [guestList]);

  function addGuest(guest) {
    setGuestList([guest, ...guestList]);
  }
  function toggleComplete(id) {
    setGuestList(
      guestList.map((guest) => {
        if (guest.id === id) {
          return {
            ...guest,
            completed: !guest.completed,
          };
        }
        return guest;
      }),
    );
  }

  function removeGuest(id) {
    setGuestList(guestList.filter((guest) => guest.id !== id));
  }

  return (
    <div className="App">
      <Typography style={{ padding: 16 }} variant="h1">
        RSVP Guest List
      </Typography>
      <GuestForm addGuest={addGuest} />
      <GuestList
        guestList={guestList}
        removeGuest={removeGuest}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
