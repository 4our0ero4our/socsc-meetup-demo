import React, { useState, useEffect } from "react";
import "./App.css";
import SocscFUTLogo from "./assets/SOCSC FUT Logo S.jpg";

import { getObject } from "./utils";
import { ConnectButton } from "@mysten/dapp-kit";
import { Transaction } from "@mysten/sui/transactions";
import { useSignAndExecuteTransaction } from "@mysten/dapp-kit";
import { useCurrentAccount } from "@mysten/dapp-kit";

function App() {
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [gender, setGender] = useState("");
  const [registrations, setRegistrations] = useState([]);

  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [_digest, setDigest] = useState("");

  const account = useCurrentAccount();

  const PACKAGE_ID =
    "0xe6aa54abadabc4324b6fb8a8a4bcab727a7bd38100e6ceaaa71872b98b493485";
  const STUDENTS_OBjECT_ID =
    "0xb1823d81a3d2033c9a76c4582d36250855e5afc520a6bdca30fe8442af41c695";

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const gd = "Male" ? true : false;
    const transaction = new Transaction();
    transaction.moveCall({
      target: `${PACKAGE_ID}::smart_contract::add_student`,
      arguments: [
        transaction.object(STUDENTS_OBjECT_ID),
        transaction.pure.string(first_name),
        transaction.pure.string(last_name),
        transaction.pure.bool(gd),
      ],
    });
    signAndExecuteTransaction(
      {
        transaction: transaction,
        chain: "sui:devnet",
      },
      {
        onSuccess: (result) => {
          setDigest(result.digest);
          setfirst_name("");
          setlast_name("");
          setGender("");
        },
      }
    );
  };


  useEffect(() => {
    const fetchRegistrations = async () => {
      const mockData = await getObject(STUDENTS_OBjECT_ID);
      setRegistrations(mockData);
    };

    fetchRegistrations(); // Initial fetch

    const interval = setInterval(() => {
      fetchRegistrations();
    }, 5000); // Fetch data every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
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
          <ConnectButton />
        </div>
      </nav>

      <main className="main-content">
        <section className="registration-form">
          <h2>Register for the Sui On Campus Student Club Event</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="first_name">First Name:</label>
              <input
                type="text"
                id="first_name"
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="last_name">Last Name:</label>
              <input
                type="text"
                id="last_name"
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
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

            <button type="submit" className="submit-btn" disabled={!account}>
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
                  Name: {registration.last_name} {registration.first_name}
                </p>
                <p>Gender: {registration.gender}</p>
                <p>
                  wallet_address: {registration.wallet_address.slice(0, 6)}...
                  {registration.wallet_address.slice(-4)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
