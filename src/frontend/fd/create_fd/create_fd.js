// Import React and useState from React
import React, { useState } from "react";
// Import the CSS file
import "./create_fd.css";


const Create_fd = () => {

  const [yourName, setYourName] = useState("");
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState(0);
  const [nominee, setNominee] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();


    const isValidTime = parseFloat(time) >= 1 && parseFloat(time) <= 24;

    if (isValidTime) {
      console.log("Form submitted:", yourName, amount, time);
      fetch("http://localhost:4000/createFD/createFds",{
        method:"POST",
        headers:{
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({amount: amount,time: time,nominee: nominee})
      })
      .then((response)=>{
        if(response.ok){
          console.log("Successful fd")
        }
        else{
          console.log("Error creating fd")
        }
      })



    } else {
      alert("Please enter a valid time between 3 months and 2 years.");
    }
  };

  return (
    <div>
      <div>
        <h3>The rate of interest for the loan is 6%</h3>
      </div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label htmlFor="yourName">Your Name:</label>
          <input
            type="text"
            id="yourName"
            name="yourName"
            onChange={(e) => setYourName(e.target.value)}
            required
          />

          <label htmlFor="Amount">Amount:</label>
          <input
            type="text"
            id="Amount"
            name="Amount"
            onChange={(e) => setAmount(e.target.value)}
            required
          />

          <label htmlFor="Nominee">Nominee:</label>
                    <input
                      type="text"
                      id="Nominee"
                      name="Nominee"
                      onChange={(e) => setNominee(e.target.value)}
                      required
                    />

          <label htmlFor="time">Time in months:</label>
          <input
            type="text"
            id="time"
            name="time"
            onChange={(e) => setTime(e.target.value)}
            required
          />

          <button className="submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create_fd;
