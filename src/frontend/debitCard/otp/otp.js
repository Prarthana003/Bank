import React, { useState } from 'react';
import './otp.css'; 
import { useLocation } from 'react-router-dom';

const OTPForm = ({ onSubmit }) => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const amount = location.state && location.state.amount;
  const toacc = location.state && location.state.toaccno;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/verifyOtp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ otp: otp, amount: amount,toacc: toacc}),
      });

      if (response.ok) {
        console.log("OTP sent successfully!");
        // You can perform further actions here after OTP submission
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
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
  );
};

export default OTPForm;
