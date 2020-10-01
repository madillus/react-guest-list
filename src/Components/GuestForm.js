import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import { Button, TextField } from '@material-ui/core';

function GuestForm({ props }) {
  const [apiGuestList, setApiGuestList] = useState([]);
  const [guestFirstName, setGuestFirstName] = useState('');
  const [guestLastName, setGuestLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const baseUrl = 'https://madillusguest.herokuapp.com/';

  useEffect(() => {
    async function getGuests() {
      const response = await fetch(`${baseUrl}/`);
      const allGuests = await response.json();
      setApiGuestList(allGuests);
    }
    if (loading === false) {
      getGuests();
    }
  }, [loading]);

  //
  // REMOVE GUEST
  async function deleteGuest(id) {
    setLoading(true);
    await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    setLoading(false);
  }
  //
  //UPDATE ATTENDING
  async function updateAttending(id) {
    setLoading(true);
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: true }),
    });
    setLoading(false);
  }
  async function updateNotAttending(id) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: false }),
    });
  }

  return (
    <form
      onSubmit={(e) => {
        props.addGuest(guestFirstName, guestLastName);
        e.preventDefault();
        setGuestFirstName([]);
        setGuestLastName([]);
      }}
    >
      <TextField
        required
        type="text"
        label="FirstName"
        value={guestFirstName}
        onChange={(e) => setGuestFirstName(e.currentTarget.value)}
      />
      <TextField
        required
        type="text"
        label="LastName"
        value={guestLastName}
        onChange={(e) => setGuestLastName(e.currentTarget.value)}
      />
      <Button type="submit">Submit</Button>

      <h2>Api Guestlist</h2>
      <div>
        <ul>
          {apiGuestList.map((item, index) => (
            <li
              key={item.id}
              style={{
                color: apiGuestList[index].attending ? 'green' : 'red',
              }}
            >
              {item.firstName} {item.lastName}
              <button onClick={() => updateAttending(item.id)}>
                Attending
              </button>
              <button onClick={() => updateNotAttending(item.id)}>
                Not Attending
              </button>
              <button onClick={() => deleteGuest(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </form>
  );
}

export default GuestForm;

// function handleFirstNameInputChange(e) {
//   setGuestFirstName({
//     ...guestFirstName,
//     guestFirstName: e.target.value,
//   });
// }
// function handleLastNameInputChange(e) {
//   setGuestLastName({
//     ...guestLastName,
//     guestLastName: e.target.value,
//   });

// function handleSubmit(e) {
//   e.preventDefault();
//   if (guest.fullName.trim()) {
//     addGuest({ ...guest, id: uuidv4() });
//     setGuest({ ...guest, fullName: '' });
//   }
// }

// function GuestForm({ addGuest }) {
//   const [guest, setGuest] = useState({
//     id: '',
//     firstName: '',
//     completed: false,
//   });

//   function handleFirstNameInputChange(e) {
//     setGuest({
//       ...guest,
//       firstName: e.target.value,
//     });
//   }
//   function handleSubmit(e) {
//     e.preventDefault();
//     if (guest.firstName.trim()) {
//       addGuest({ ...guest, id: uuidv4() });
//       setGuest({ ...guest, firstName: '' });
//     }
//   }

//   return (
//     <form className="guest-form" onSubmit={handleSubmit}>
//       <TextField
//         label="FirstName"
//         type="text"
//         name="firstName"
//         value={guest.firstName}
//         onChange={handleFirstNameInputChange}
//       />

//       <Button type="submit">Submit</Button>
//     </form>
//   );
// }

// export default GuestForm;
