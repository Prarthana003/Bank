import React from 'react';
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';
import AppBar from './frontend/appBar';
import BankServices from './frontend/home';
import LoginComponent from './frontend/Login/login';
import Next from './frontend/next';
import NotExisting_login from './frontend/Login/notexist';
import EmailForm from './frontend/email/email';
import MainPage from './frontend/MainPage/MainPage';
import LoanPage from './frontend/Loan/LoanPage/LoanPage';
import MakePayment from './frontend/Loan/makePayment/makePayment';
import ApplyLoan from './frontend/Loan/applyLoan/applyLoan';
import Transaction from './frontend/transaction/transaction';
import AddBeneficiary from './frontend/addBeneficiary/addBeneficiary';
import Transactions from './frontend/UrTranactions/UrTransactions';
import FDPage from './frontend/fd/fd_page/fdPage';
import UrFd from './frontend/fd/ur_fds/urfd';
import DebitCard from './frontend/debitCard/dcPay/dcPay';
import OTPForm from './frontend/debitCard/otp/otp';



// import 
const App = () => {
  return (
    <div>
    <Routes>
        <Route exact path ="/" element ={<BankServices/>} />
        <Route exact path ="/login" element ={<LoginComponent/>} />
        <Route exact path ="/next" element ={<Next/>} />
        <Route exact path ="/notexist" element ={<NotExisting_login/>} />
        <Route exact path ="/email" element ={<EmailForm/>} />
        <Route exact path ="/mainPage" element ={<MainPage/>} />
        <Route exact path ="/loanPage" element ={<LoanPage/>} />
        <Route exact path ="/makeLoanPayment" element ={<MakePayment/>} />
        <Route exact path ="/applyLoan" element ={<ApplyLoan/>} />
        <Route exact path = "/transaction" element={<Transaction/>} />
        <Route exact path = "/addBeneficiary" element={<AddBeneficiary/>} />
        <Route exact path = "/urTransactions" element={<Transactions/>} />
        <Route exact path = "/fdpage" element={<FDPage/>} />
        <Route exact path = "/urFD" element={<UrFd/>} />
        <Route exact path = "/Debitcard" element={<DebitCard/>} />
        <Route exact path = "/otpForm" element={<OTPForm/>} />
        
    </Routes>
    </div>
  );
};

export default App;