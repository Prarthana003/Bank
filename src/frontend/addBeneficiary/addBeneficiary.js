import React, { useState,useEffect } from "react";
import Navbar2 from "../components/Navbar2/Navbar2";
import "./addBeneficiary.css"


const AddBeneficiary=()=>{

    const [name,setName] = useState("")
    const [benacc,setBenAcc] = useState(0)
    const [benName,setBenName] = useState("")
    const[beneficiaries,setBeneficiary] = useState([])

    const handleName=(event)=>{
        const n = event.target.value;
        setName(n)
        }

    const handleBenAcc=(event)=>{
        const a = event.target.value
        const benacc = parseInt(a);


        // Check if the conversion is successful
        if (!isNaN(benacc)) {
        setBenAcc(benacc);
        } else {
        console.log("float error!");
        }
           
    }

    const handleBenName=(event)=>{
        const benName = event.target.value
        setBenName(benName)
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

    const handleSubmit = () => {


        const isBenAccNoPresent = beneficiaries.some(beneficiary => beneficiary.toAccountno === benacc);
        console.log("check = ",isBenAccNoPresent)
        console.log("benacc= ",benacc)
        console.log(beneficiaries)

        if(!isBenAccNoPresent)
      {
          fetch("http://localhost:4000/addBen/addBeneficiary", { // Update the URL to match the route
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, benAcc: benacc, benName: benName }),
        })
        .then((response) => {
            if (response.ok) {
                console.log("Successful insert!");
                alert("Successfully added beneficiary!")
            } else {
                console.log("Insert failed!");
                alert("Oops!Something went wrong. Failed to add beneficary")
            }
        })
        .catch((error) => {
            console.error("Error: ", error);
            alert("Oops!Something went wrong. Failed to add beneficary")
            
        });
    }
    }
    

    return(
        <div>
            <Navbar2/>
            <div className="heading">
                <h1 className="t1">Add beneficiary</h1>
            </div>
            <div className="form">
                <form >
                    <label htmlFor="yourName">Your Name:</label>
                    <input
                    type="text"
                    id="yourName"
                    name="yourName"
                    onChange={handleName}
                    
                    
                    required
                    />

                    <label htmlFor="beneficiaryAccountNo">Beneficiary Account No:</label>
                    <input
                    type="text"
                    id="beneficiaryAccountNo"
                    name="beneficiaryAccountNo"
                    onChange={handleBenAcc}
                    
                    required
                    />

                    <label htmlFor="beneficiaryAccountName">Beneficiary Account Name:</label>
                    <input
                    type="text"
                    id="beneficiaryAccountName"
                    name="beneficiaryAccountName"
                    onChange={handleBenName}
                    
                    required
                    />

                    <button className="submit"
                    onClick={handleSubmit}
                    type="submit">Submit</button>
                </form>
                </div>

        </div>
    )
}

export default AddBeneficiary