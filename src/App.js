import './App.css';
import { useState, useEffect } from 'react';

const baseUrl = 'https://react-guest-list-sh.herokuapp.com';
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestArr, setGuestArr] = useState([]);

  // Add guest to API localhost:5000
  console.log(userData);

  async function fetchData() {
    const response = await fetch(`${baseUrl}/`);
    const data = await response.json();
    setGuestArr(data);
  }

  async function addGuest() {
    await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
      }),
    });
    setFirstName('');
    setLastName('');

    fetchData();
  }

  async function updateGuest(newAttend, id) {
    await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: newAttend }),
    });
    fetchData();
  }

  async function deleteGuest(deleteAttend, id) {
    const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
    await response.json();

    fetchData();
  }

  useEffect(
    () => {
      fetchData();
    },
    // Empty dependency array says that we only want to run
    // this on the first mount (only once, on load)
    [],
  );
  return (
    <>
      <section className="container">
        <div className="div1-style">
          <h1> Guest List </h1>
          <p>First Name: </p>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p>Last Name: </p>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <br />
          <br />

          <button onClick={addGuest}>Add Guest</button>
        </div>
      </section>
      <section className="guest-list">
        <br />
        <br />
        <h2>List of Attendees : </h2>
        {guestArr.map((singleGuest, index) => {
          return (
            <div key={index} className="guest-div">
              <b> First Name: </b>
              {singleGuest.firstName}
              <br />
              <b> Last Name: </b>
              {singleGuest.lastName}
              <br />

              <label>
                Attending:
                <input
                  type="checkbox"
                  onChange={() => {
                    updateGuest(!singleGuest.attending, singleGuest.id);
                  }}
                  le
                  checked={singleGuest.attending}
                />{' '}
              </label>
              <label>
                <button
                  onClick={() => {
                    deleteGuest(!singleGuest.deleteGuest, singleGuest.id);
                  }}
                  clicked={singleGuest.deleteGuest}
                >
                  Delete guest{' '}
                </button>
              </label>
            </div>
          );
        })}
      </section>
    </>
  );
}
export default App;
