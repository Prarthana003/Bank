import React, { useState } from 'react';
import './otp.css'; 
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar2 from '../../components/Navbar2/Navbar2';


const OTPForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const [type ,setType] = useState("")
  const amount = location.state && location.state.amount;
  const toacc = location.state && location.state.toaccno;

  const navigate = useNavigate()
  //setType("debit")

  const updateTransaction = () => {
    setType("debit")
    fetch("http://localhost:4000/updateTransaction/updates", { // Update the URL to match the route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: 4, toaccountno: toacc, amt: amount,type:"debit" }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Transaction successful!");
          alert("Your transaction was successful")
        } else {
          console.log("Transaction failed!");
          alert("Your transaction has failed!")
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error("Error: ", error);
      });
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/verifyOtp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp, amount: amount,toacc: toacc,flag:1}),
      });

      if (response.ok) {
        console.log("OTP sent successfully!");
        updateTransaction()
        navigate("/success")
        // You can perform further actions here after OTP submission
      } else {
        console.error("Failed to send OTP");
        navigate("fail")
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      
    }



  };

  return (
    <div>
    <Navbar2/>
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <p>Amount to pay: {amount}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="otp">OTP:</label>
          <input
            type="text"
            id="otp"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            pattern="\d{6}"
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
    </div>
  );
};

export default OTPForm;
