import React, { useEffect, useState } from "react";
import Navbar2 from "../../components/Navbar2/Navbar2";
import LoanHeader from "../../components/loanHeader/loanHeader";

const MakePayment=()=>{
    console.log("in make payment")
    const  [loanId,setLoanId] = useState(0)
    const [amount, setAmount] = useState(0)
    const [check, setcheck] = useState(0)


    const handleLoanId=(event)=>{
        const l = event.target.value
        const amt = parseInt(l)
        setLoanId(amt)
    }

    const handleAmount=(event)=>{
        const a = event.target.value
        const amt = parseFloat(a)
        setAmount(amt)

    }

    const handlePay = () => {
        console.log("in handle pay");
        fetch("http://localhost:4000/loanPayment/loanPayments", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ loanId: loanId, amount: amount })
        })
          .then((response) => {
            if (response.ok) {
              console.log("successful insert");
            } else {
              console.log("failed to insert!");
              alert("invalid amount!")
            }
            return response.json(); // Add this line to parse the JSON response
          })
          .then((data) => {
            // Do something with the data if needed
            console.log(data);
          })
          .catch((error) => {
            console.error("Error during fetch:", error);
            alert("error!")
          });
      };
   



const update =()=>{
    fetch("http://localhost:4000/updateLoan/payloan",{
        method: "POST",
        headers:{
            'Content-Type' : "application/json"
        },
        body: JSON.stringify({amount: amount})
    })
    .then((response)=>{
        if(response.ok){
            console.log("Successful update")
            alert("Successful payment")
            setcheck(1)
        }
        else{
            console.log("failed to insert")
            alert("Failed to pay!")
        }
    })
}

    const handleSubmit=()=>{
        
         
        handlePay()

    }
    

    return(
        <div>
            <Navbar2/>
            <LoanHeader/>
            <div className="form">
                <form >
                    <label htmlFor="yourName">Your Name:</label>
                    <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    //onChange={handleName}
                    
                    
                    required
                    />

                <label htmlFor="Loan Id">Loan id:</label>
                    <input
                    type="text"
                    id="loan id"
                    name="loan id"
                    onChange={handleLoanId}
                    
                    
                    required
                    />


                    <label htmlFor="Loan amount">Loan Amount:</label>
                    <input
                    type="text"
                    id="amount"
                    name="amount"
                    onChange={handleAmount}
                    
                    required
                    />

                    

                    <button className="submit"
                    onClick={handleSubmit}
                    >Pay</button>
                </form>
                </div>
            
        </div>
    )
}

export default MakePayment