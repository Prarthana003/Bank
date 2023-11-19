import React from "react";
import Navbar2 from "../../components/Navbar2/Navbar2";
import LoanHeader from "../../components/loanHeader/loanHeader";
import YourLoans from "../YourLoans/yourLoans";


const LoanPage=()=>{
    return (
        <div>
            <Navbar2/>
            <LoanHeader/>
            <YourLoans/>

        </div>
    )
}

export default LoanPage