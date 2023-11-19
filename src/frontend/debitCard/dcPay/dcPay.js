import React, { useState } from "react";
import Navbar2 from "../../components/Navbar2/Navbar2";
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
    const fetchEmail = async () => {
        try {
            console.log("getting email");
            const response = await fetch('http://localhost:4000/mail/getMail');
            const data = await response.json();
        
            if (data.length > 0) {
                setMailid(data[0].email); // Assuming the response is an array with a single result
            } else {
                console.log("Email not found");
            }
        } catch (error) {
            console.error('Error fetching email:', error);
        }
    };
    
    fetchEmail();
}, []);


  const handleSubmit = async (event) => {
    event.preventDefault();

    const toaccno = parseInt(to)


    try {
      console.log('mailid ',mailid)
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
      <Navbar2 />
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
