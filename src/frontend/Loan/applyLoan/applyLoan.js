import React, { useEffect, useState } from "react";
import Navbar2 from "../../components/Navbar2/Navbar2";
import LoanHeader from "../../components/loanHeader/loanHeader";
import "./applyLoan.css"; 
import { useNavigate } from "react-router-dom";


const ApplyLoan = () => {
    const [balance ,setCurrentBalance] = useState(0)
    const [principal,setPricipal ] = useState(0)
    const [time,setTime] = useState(0)

    const navigate = useNavigate()

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

      const handleTime=(e)=>{
        const t = parseInt(e.target.value)
        setTime(t)
      }

      const handleAmount=(e)=>{
        const a = parseInt(e.target.value)
        const b = 2*balance;
        console.log(balance,' ',a)
        if(a<b){
            console.log("valid amount")
            setPricipal(a)
      }
        
        else{
            alert("The loan amount you are asking for is too high for your current balance")
        }

      }


      const  handleSubmit1=()=>{
        console.log("submitting")
        fetch("http://localhost:4000/appLoan/loan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ principal : principal,time : time }),
      })
        .then((response) => {
          if (response.ok) {
            console.log("Successful loan");
            navigate("/success")
          } else {
            console.log("Error creating loan");
            navigate("/fail")
          }
        });
      }


  return (
    <div>
      <Navbar2 />
      <LoanHeader />
       
      <div className="loanForm">
        <h2 className="interest">Interest for loan is 12% per annum</h2>
        <form className="form">
          <div className="formGroup">
            <label className="label" htmlFor="yourName">Name:</label>
            <input type="text" id="yourName" name="yourName" className="inputField" required />
          </div>

          <div className="formGroup">
            <label className="label" htmlFor="loanAmount">Loan Amount:</label>
            <input type="text" 
            onChange={handleAmount}
            className="inputField" required />
          </div>

          <div className="formGroup">
            <label className="label" htmlFor="time">Time (in months):</label>
            <input type="text" 
            onChange={handleTime}
            id="time" name="time" className="inputField" required />
          </div>

          <button 
          onClick={handleSubmit1}
          className="submitButton">Apply</button>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
