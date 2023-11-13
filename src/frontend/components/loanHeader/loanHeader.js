import React from "react";
import { Link } from "react-router-dom";
import './loanHeader.css'

const LoanHeader=()=>{
    return(
        <div className="header">
            <Link  to ="/loanPage"><h2 className="t1">Your loans</h2></Link>
            <Link to="/makeLoanPayment"><h2 className="t1">Make payment</h2></Link>
            <Link to="/applyLoan"><h2 className="t1">Apply for loan</h2></Link>
            
        </div>
    )
}

export default LoanHeader