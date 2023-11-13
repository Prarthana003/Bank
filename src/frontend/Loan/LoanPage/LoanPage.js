import React from "react";
import Navbar from "../../DROPDOWN/Navbar";
import LoanHeader from "../../components/loanHeader/loanHeader";
import YourLoans from "../YourLoans/yourLoans";


const LoanPage=()=>{
    return (
        <div>
            <Navbar/>
            <LoanHeader/>
            <YourLoans/>

        </div>
    )
}

export default LoanPage