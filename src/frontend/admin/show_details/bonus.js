import React, { useState, useEffect } from "react";
import AdminNavbar from "../DROPDOWN/AdminNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const Bonus = () => {
    const [transactionData, setTransactionData] = useState([]);
    const [LoanData, setLoanData] = useState([]);
    const [FdData, setFdData] = useState([]);
    const [bonus_perc, setBonusperc] = useState('');
    const set_value=(e)=>{
       setBonusperc(e.target.value);
       console.log(e.target.value);
    }
    
  const handleraccount3=()=>{
    fetch("http://localhost:4000/updateBonus/enable_bonus", {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify({ "percent":bonus_perc})
                
            })
                .then((response) => response.json())
                .then((data) => {setFdData(data);alert("Bonus set")})
                .catch((error) => console.error("Error fetching data:", error));


  }

  return (
    <div>
        <AdminNavbar/>
      {/* <div className="heading"><h1 className="t1">Your Transactions</h1></div> */}
      <div className="transaction-table-container">

        <div style={{ textAlign: 'center', padding:'40px' }} class="entry">
        <h2>Enter Bonus percentage:</h2>
        <input style={{ textAlign: 'center', padding:'10px' }} class="acc_input" type="number" onChange={set_value} ></input>
       
        <button class="search"style={{ padding:'10px'}} onClick={handleraccount3}>Apply Bonus</button>
        {/* <button class="search"style={{ padding:'10px'}} onClick={handleraccount3}>Delete Account</button> */}
        </div>
      </div>
      



    </div>
  );
  };

export default Bonus;