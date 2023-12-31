import React, { useState, useEffect } from 'react';
import './balance.css';
import Navbar2 from '../components/Navbar2/Navbar2';


const Balance = () => {
  const [currentBalance, setCurrentBalance] = useState(0);

  useEffect(() => {
    
    const fetchBalance = async () => {
        try {
          console.log("getting balance")
          const response = await fetch('http://localhost:4000/balance/balance');
          const data = await response.json();
      
          setCurrentBalance(data[0].current_outstanding); // Assuming the response is an array with a single result
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
      
    fetchBalance();
  }, []);

  return (
    <div>
      <Navbar2/>
      <div className="heading"><h1 className="t1">Your Balance</h1></div>
    <div className="balance-container">
  
      <h2>Your Current Balance</h2>
      <table className="balance-table">
        <tbody>
          <tr>
            <td className="table-heading">Account:</td>
            <td>{/* Display account information if needed */}</td>
          </tr>
          <tr>
            <td className="table-heading">Balance:</td>
            <td className="balance-amount">Rs{currentBalance.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default Balance;
