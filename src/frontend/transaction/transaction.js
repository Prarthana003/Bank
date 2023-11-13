import React, { useState, useEffect } from "react";
import Navbar from "../DROPDOWN/Navbar";
import "./transaction.css";

const Transaction = () => {
  const [beneficiary, setBeneficiary] = useState([]);
  const [toAccountNo, setToAccountNo] = useState("");
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event) => {
    const a = event.target.value;
    const amt = parseFloat(a);

    // Check if the conversion is successful
    if (!isNaN(amt)) {
      setAmount(amt);
    } else {
      console.log("float error!");
    }
  };

  const handlePayClick = () => {
    fetch("http://localhost:4000/transaction/transactions", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: 4, toAccountNo: toAccountNo, amt: amount }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Transaction successful!");
        } else {
          console.log("Transaction failed!");
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error("Error: ", error);
      });
  };


  const updateTransaction = () => {
    fetch("http://localhost:4000/updateTransaction/updates", { // Update the URL to match the route
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: 4, toaccountno: toAccountNo, amt: amount }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Transaction successful!");
        } else {
          console.log("Transaction failed!");
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error("Error: ", error);
      });
    
  }

  const submit=()=>{
    handlePayClick()
    updateTransaction()
  }

  useEffect(() => {
    // Fetch JSON data from the server (assuming beneficiary.js is the server)
    fetch('http://localhost:4000/beneficiary/getBeneficiaries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ acc: 4 }),
    })
      .then((response) => response.json())
      .then((data) => setBeneficiary(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="heading">
        <h1 className="t1">Transaction</h1>
      </div>
      <div className="box1">
        <div className="form">
          <form>
            <div className="box2">
              <label htmlFor="beneficiary">Beneficiary:</label>
              {beneficiary.map((item) => (
                <div key={item.toAccountno}>
                  <input
                    type="radio"
                    id={`beneficiary_${item.toAccountno}`}
                    name="beneficiary"
                    value={item.toAccountno}
                    onChange={(e) => setToAccountNo(e.target.value)}
                  />
                  <label htmlFor={`beneficiary_${item.toAccountno}`}>
                    Name: {item.toname}&nbsp;&nbsp;&nbsp;Account: {item.toAccountno}
                  </label>
                </div>
              ))}
            </div>

            <label htmlFor="amount">Amount to be Paid:</label>
            <input
              type="text"
              id="amount"
              name="amount"
              required
              onChange={handleAmountChange}
            />

            <div className="submit">
              <button onClick={submit}>
                Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
