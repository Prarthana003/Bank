import React, { useState } from "react";
import Navbar from "../../DROPDOWN/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "./dcPay.css";

const DebitCard = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [mailid, setMailid] = useState("");
  const [to, setto] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:4000/getphno/getphno", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    })
      .then((response) => response.json())
      .then((data) => setMailid(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const toaccno = parseInt(to)


    try {
      const response = await fetch("http://localhost:4000/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mailid: mailid, amount: amount }),
      });

      if (response.ok) {
        console.log("OTP sent successfully!");
        navigate("/otpForm", { state: { amount: amount,toaccno : toaccno } });
      } else {
        console.error("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="debit-card-form-container">
        <h2>Debit Card Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cardNumber">Debit Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter card number"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardNumber">To account number:</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              placeholder="Enter the to account number"
              onChange={(e) => setto(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount to Pay:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <button type="submit">Pay Now</button>
        </form>
      </div>
    </div>
  );
};

export default DebitCard;
