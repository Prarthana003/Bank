import React from "react";
import Navbar from "../DROPDOWN/Navbar";
import { Link } from "react-router-dom";
import './MainPage.css'

const MainPage = ()=>{
    return(
        <div>
            <Navbar/>
            <div className="Box1">
                <div className="Box2">
                <Link to ="/loanPage"><h2>Take Loan</h2></Link>
                </div>
                <div className="Box2">
                <Link to ="/fdPage"><h2>Fixed Deposit</h2></Link>
                </div>
                <div className="Box2">
                <Link to ="/addBeneficiary"><h2>Add Beneficiary</h2></Link>
                </div>
                <div className="Box2">
                <Link to = "/Debitcard"><h2>DEBIT CARD</h2></Link>
                </div>
                

            </div>
            <div className="Box3">
                <div className="Box4">
                <Link to = "/urTransactions"><h2>Check your transactions</h2></Link>
                </div>
                <div className="Box4">
                <Link><h2>Check your balance</h2></Link>
                </div>
                <div className="Box4">
                <Link to="/transaction"><h2>Make transactions</h2></Link>
                </div>
                

            </div>

        </div>
    )
}

export default MainPage