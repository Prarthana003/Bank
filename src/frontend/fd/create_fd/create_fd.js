// Import React and useState from React
import React, { useState } from "react";
// Import the CSS file
import "./create_fd.css";

const Create_fd = () => {
  const [yourName, setYourName] = useState("");
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [nominee, setNominee] = useState("");


  const updateTransaction = () => {
    const a = parseFloat(amount)
    fetch("http://localhost:4000/updateTransaction/updates", { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({  toaccountno: 4, amt: a ,type: "fd"}),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Transaction successful!");
          alert("Successfully created fd!")
        } else {
          console.log("Transaction failed!");
          alert("Failed to create FD! Please try again")
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error("Error: ", error);
        alert("Failed to create FD! Please try again")
      });
    
  }


  const handleSubmit = (event) => {
    event.preventDefault();

    const isValidTime = parseFloat(time) >= 1 && parseFloat(time) <= 24;

    if (isValidTime) {
      console.log("Form submitted:", yourName, amount, time);
      fetch("http://localhost:4000/createFD/createFds", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount, time: time, nominee: nominee }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Successful fd");
            updateTransaction()
          } else {
            console.log("Error creating fd");
          }
        });
    } else {
      alert("Please enter a valid time between 3 months and 2 years.");
    }
  };





  return (
    <div className="container">
      <div>
        <h3 className="rate-heading">The rate of interest for the loan is 6%</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="yourName" className="form-label">
            Your Name:
          </label>
          <input
            type="text"
            id="yourName"
            name="yourName"
            className="form-input"
            onChange={(e) => setYourName(e.target.value)}
            required
          />

          <label htmlFor="Amount" className="form-label">
            Amount:
          </label>
          <input
            type="text"
            id="Amount"
            name="Amount"
            className="form-input"
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label htmlFor="Nominee" className="form-label">
            Nominee:
          </label>
          <input
            type="text"
            id="Nominee"
            name="Nominee"
            className="form-input"
            onChange={(e) => setNominee(e.target.value)}
            required
          />

          <label htmlFor="time" className="form-label">
            Time in months:
          </label>
          <input
            type="text"
            id="time"
            name="time"
            className="form-input"
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_fd;
