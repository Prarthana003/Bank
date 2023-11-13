import React, { useState, useEffect } from "react";
import "./yourLoans.css"

const YourLoans = () => {
  const [loanData, setLoanData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/yourLoans/urLoans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setLoanData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Define a function to render the loan data as a table
  const renderLoanTable = () => {
    if (loanData.length === 0) {
      return <p>No loans found for this user.</p>;
    }

    return (
      <table className="loan-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Amount</th>
            <th>Interest Rate</th>
            <th>Account Number</th>
            <th>To Be Paid</th>
            <th>Principal</th>
            <th>Loan Time</th>
            <th>Time Left</th>
            <th>Time in Years</th>
          </tr>
        </thead>
        <tbody>
          {loanData.map((loan) => (
            <tr key={loan.loanId}>
              <td>{loan.loanId}</td>
              <td>${loan.amount}</td>
              <td>{loan.rate}%</td>
              <td>{loan.acc_no}</td>
              <td>Rs{loan.toBePaid}</td>
              <td>Rs{loan.principal}</td>
              <td>{loan.ltime}</td>
              <td>{loan.timeLeft}</td>
              <td>{loan.time_yrs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <h1>Your Loans</h1>
      {renderLoanTable()}
    </div>
  );
};

export default YourLoans;
