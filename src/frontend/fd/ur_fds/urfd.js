import React, { useState, useEffect } from "react";
import Navbar2 from "../../components/Navbar2/Navbar2";
import FDHeader from "../../components/fd_header/fd_header";
import "./urfd.css"

const UrFd = () => {
  const [fdData, setFdData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/urFds/UrFds", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // You might need to pass any necessary parameters here
        accountNo: 4,
      }),
    })
      .then((response) => response.json())
      .then((data) => setFdData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderFdTable = () => {
    if (fdData.length === 0) {
      return <p>No FD data found for this account.</p>;
    }

    return (
      <table className="fd-table">
        <thead>
          <tr>
            <th>FD ID</th>
            <th>Principal</th>
            <th>Interest</th>
            <th>Opening Date</th>
            <th>Closing Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {fdData.map((fd) => (
            <tr key={fd.fd_id}>
              <td>{fd.fd_id}</td>
              <td>Rs{fd.principal}</td>
              <td>{fd.interest}</td>
              <td>{fd.openingDate}</td>
              <td>{fd.closingDate}</td>
              <td>Rs{fd.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Navbar2 />
      <FDHeader />
      <div className="heading">
        <h1 className="t1">Your Fixed Deposits</h1>
      </div>
      <div className="fd-table-container">{renderFdTable()}</div>
    </div>
  );
};

export default UrFd;
