import './App.css';
import { useState, useEffect } from 'react';
export function handleChange(e) {
  console.log(e.target.value);
}
const baseUrl = 'http://localhost:5000';
function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userData, setUserData] = useState([]);

  // Add guest to API localhost:5000
  console.log(userData);
  async function addGuest() {
    const response = await fetch(`${baseUrl}/`, {
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

  async function fetchData() {
    const response = await fetch(`${baseUrl}/`);
    const data = await response.json();
    setUserData(data);
  }

  async function updateGuest(newAttend, id) {
    const response = await fetch(`${baseUrl}/${id}`, {
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
    const deletedGuest = await response.json();

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
        <div>
          <h1> Guest List </h1>
          <p>First Name:</p>
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <p>Last Name:</p>
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <br />
          <br />
          <br />
          <br />

          <button onClick={addGuest}>Add Guest</button>
        </div>
      </section>
      <section className="guest-list">
        <br />
        <br />
        <div>GuestList</div>
        {userData.map((singleGuest, index) => {
          return (
            <div key={index}>
              <b>First Name:</b>
              {singleGuest.firstName}
              <br />
              <b>Last Name:</b>
              {singleGuest.lastName}
              <br />
              <label>
                Attending:
                <input
                  type="checkbox"
                  // Controlled Components #2: onChange of form element
                  // (including using the `setDarkMode` setter function)
                  onChange={(event) => {
                    // console.log(event.target.value);
                    // console.log(singleGuest.attending);

                    updateGuest(!singleGuest.attending, singleGuest.id);
                  }}
                  // Controlled Components #3: Set the value to the state variable
                  checked={singleGuest.attending}
                />{' '}
              </label>
              <label>
                <button
                  //type="checkbox"
                  // Controlled Components #2: onChange of form element
                  // (including using the `setDarkMode` setter function)
                  onClick={(event) => {
                    // console.log(event.target.value);
                    // console.log(singleGuest.attending);

                    deleteGuest(!singleGuest.deleteGuest, singleGuest.id);
                  }}
                  // Controlled Components #3: Set the value to the state variable
                  clicked={singleGuest.deleteGuest}
                >
                  Delete guest{' '}
                </button>
                {''}
              </label>
            </div>
          );
        })}
      </section>
    </>
  );
}
export default App;
