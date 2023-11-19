import React, { useState, useEffect } from "react";
import Navbar2 from "../components/Navbar2/Navbar2";
import "./transaction.css";
import { useNavigate } from "react-router-dom";

const Transaction = () => {
  const [beneficiary, setBeneficiary] = useState([]);
  const [toAccountNo, setToAccountNo] = useState("");
  const [amount, setAmount] = useState(0);
  const[check,setcheck] = useState(0)
  const type = "online"

  const navigate = useNavigate();

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
      body: JSON.stringify({ from: 4, toaccountno: toAccountNo, amt: amount ,type:type}),
    })
      .then((response) => {
        alert(response)
        if (response) {
          
          console.log("Transaction successful!");
          alert("Your transaction was successful")
        } else {
           console.log(response)
          console.log("Transaction failed!");
          alert("Your transaction has failed!")
        }
      })
      .catch((error) => {
        // Handle network errors here
        console.error("Error: ", error);
      });
    
  }

  const submit=()=>{
    if(amount<=0){
      alert("invalid amount!")
    }
    else{
      handlePayClick()
    console.log("check -",check)
      updateTransaction()
    }
    
      //alert("successful")
    
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

  const renderBeneficiaries=()=>{
    console.log(beneficiary)
    if(beneficiary["accountno"]==-1){
      return(
        <div>
          <h2>You do not have any beneficiaries. Please add beneficiaries to make transctions</h2>
        </div>
      )
    }
    else{
      return(
        <div className="box2">
        <label htmlFor="beneficiary">Beneficiary:</label>
        {/* if(beneficiary.length==0){
          <div>
            <h1> You do not have an</h1>
          </div> */}
        
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
      )
    }
  }


  return (
    <div>
      <Navbar2/>
      <div className="heading">
        <h1 className="t1">Transaction</h1>
      </div>
      <div className="box1">
        <div className="form">
          <form>
           
          <div >{renderBeneficiaries()}</div>
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
