import React from "react";
import Navbar from "../DROPDOWN/Navbar";
import { Link } from "react-router-dom";
import './MainPage.css'
import Navbar2 from "../components/Navbar2/Navbar2";

const MainPage = ()=>{
    return(
        <div className="box0">
            <Navbar2/>
            <div className="Box1"
            >
                <div className="Box2" style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQZri0U3lfpyaijH9WvJZ4SCHtYR4UWneYzQ&usqp=CAU')"}}>
                    <Link to="/loanPage"><h2 className="ttt">Take Loan</h2></Link>
                </div>

                <div className="Box2"
                style={{backgroundImage: "url('https://images.hindustantimes.com/img/2022/08/17/550x309/02_(26)_1660720028776_1660720035668_1660720035668.jpg')"}}
                >
                <Link to ="/fdPage"><h2  className="ttt">Fixed Deposit</h2></Link>
                </div>
                <div className="Box2"
                style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRbcbVOo9MsCPy22wvEyHVjdfYTg6tP6Shng&usqp=CAU')"}}
                >
                <Link to ="/addBeneficiary"><h2  className="ttt">Add Beneficiary</h2></Link>
                </div>
                <div className="Box2"
                style={{backgroundImage: "url('https://www.sbmbank.co.in/wealth/images/cards/card-2.png') "}}
                >
                <Link to = "/Debitcard"><h2  className="ttt">DEBIT CARD</h2></Link>
                </div>
                

            </div>
            <div className="Box3">
                <div className="Box4"
                //style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3fngIgY5PTPPWmSjP05VMrSpo37ldL-JFvQ&usqp=CAU')"}}
                >
                <Link to = "/urTransactions"><h2 className="ttt">Check your transactions</h2></Link>
                </div>
                <div className="Box4"
                //style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkRZri3_3UfuSQJo1Xs05aXDsVjPsLO-DGgw&usqp=CAU')"}}
                >
                <Link to ="/balance"><h2 className="ttt">Check your balance</h2></Link>
                </div>
                <div className="Box4"
                //style={{backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-2aHLSIr3V4rJvTDuzGvqWQTB-jS-aVv0Ow&usqp=CAU')"}}
                >
                <Link to="/transaction"><h2 className="ttt">Make transactions</h2></Link>
                </div>
                

            </div>

        </div>
    )
}

export default MainPage