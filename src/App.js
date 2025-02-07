import React, { useState, useEffect } from "react";
import "./App.css";
import SocscFUTLogo from "./assets/SOCSC FUT Logo S.jpg";
function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting:", { firstName, lastName, gender });
  };

  // Function to fetch registrations from blockchain
  const fetchRegistrations = async () => {
    const mockData = [
      {
        firstName: "Four Zero",
        lastName: "Four",
        gender: "Male",
        wallet: "0x1234567890abcdef",
      },
      {
        firstName: "Bard",
        lastName: "Blockchain",
        gender: "Male",
        wallet: "0x1234567890abcdef",
      },
      {
        firstName: "Ahmed Tinbu",
        lastName: "Bola",
        gender: "Female",
        wallet: "0x1234567890abcdef",
      },
      {
        firstName: "Thompson",
        lastName: "Ogoyi",
        gender: "Male",
        wallet: "0x1234567890abcdef",
      },
    ];
    setRegistrations(mockData);
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <img
            src={SocscFUTLogo}
            alt="Move Lang Dev"
            className="community-logo"
          />
        </div>
        <div className="nav-title">
          <h1>SOCSC FUT Meetup</h1>
        </div>
        <div className="connect-btn">
          <button>Connect Wallet</button>
        </div>
      </nav>

      <main className="main-content">
        <section className="registration-form">
          <h2>Register for the Sui On Campus Student Club Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Gender:</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    required
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                  />
                  Female
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!isConnected}
            >
              Submit Registration
            </button>
          </form>
        </section>

        <section className="registrations-list">
          <h2>Current Registrations</h2>
          <div className="registrations-grid">
            {registrations.map((registration, index) => (
              <div key={index} className="registration-card">
                <p>
                  Name: {registration.lastName} {registration.firstName}
                </p>
                <p>Gender: {registration.gender}</p>
                <p>Wallet: {registration.wallet}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
