import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import './App.css';
import GuestForm from './components/GuestForm';
import GuestList from './components/GuestList';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';

import Button from '@material-ui/core/Button';

function App() {
  const [guestList, setGuestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://madillusguest.herokuapp.com/';

  const [topLevelDark, setTopLevelDark] = React.useState(false);

  const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

  const lightTheme = createMuiTheme({
    palette: {
      type: 'light',
    },
  });

  async function fetchGuestList() {
    const response = await fetch(`${baseUrl}/`);
    const data = await response.json();
    setGuestList(data);
  }
  useEffect(() => {
    if (loading === false) {
      fetchGuestList();
    }
  }, [loading]);
  async function removeGuest(id) {
    setGuestList(guestList.filter((guest) => guest.id !== id));
    setLoading(true);
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    setLoading(false);
  }

  async function sendGuest(firstName, lastName) {
    setLoading(true);
    await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    setLoading(false);
  }

  function addGuest(guest) {
    setGuestList([guest, ...guestList]);
    sendGuest({ ...guest, firstName: '', lastName: '' });
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
      <MuiThemeProvider theme={topLevelDark ? darkTheme : lightTheme}>
        <CssBaseline />
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setTopLevelDark(!topLevelDark);
          }}
        >
          Dark/light mode
        </Button>
        <div>
          <MuiThemeProvider
            theme={topLevelDark ? lightTheme : darkTheme}
          ></MuiThemeProvider>
        </div>
      </MuiThemeProvider>
    </div>
  );
}
export default App;
