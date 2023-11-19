import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2/Navbar2";
import "./UrTransactions.css"

const Transactions = () => {
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/urTransactions/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setTransactionData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderTransactionTable = () => {
    if (transactionData.length === 0) {
      return <p>No transactions found for this account.</p>;
    }

    return (
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>To Account No</th>
            <th>Type</th>
            <th>Timestamp</th>
            <th>From Account</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactionData.map((transaction) => (
            <tr key={transaction.transaction_id}>
              <td>{transaction.transaction_id}</td>
              <td>Rs{transaction.amount}</td>
              <td>{transaction.toAccNo}</td>
              <td>{transaction.type}</td>
              <td>{transaction.timestamp}</td>
              <td>{transaction.fromAcc}</td>
              <td>{transaction.tdate.slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
        <Navbar2/>
      <div className="heading"><h1 className="t1">Your Transactions</h1></div>
      <div className="transaction-table-container">
        {renderTransactionTable()}
      </div>
    </div>
  );
};

export default Transactions;
