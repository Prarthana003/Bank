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
import Balance from './frontend/Balance/balance';



import Admin_main from './frontend/admin/admin_main';
import {TableComponent} from './render_json/render';
// import SwipeableTextMobileStepper from './frontend/buetify/carousel'
import Create_acc from './frontend/admin/create_account/create_account';
import Accountcreated from './frontend/admin/create_account/account_created';
import ShowDetails from './frontend/admin/show_details/showdetails';
import Unpaid from './frontend/admin/unpaid/unpaid';
import Ask_account from './frontend/admin/show_details/ask_account';
import Top3 from './frontend/admin/show_details/top3';
import AdminLoginComponent from './frontend/admin/adminlogin/adminlogin';
import Success from './frontend/success/success';
import Fail from './frontend/fail/fail';




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
        <Route exact path = "/success" element={<Success/>} />
        <Route exact path = "/fail" element={<Fail/>} />
        <Route exact path = "/balance" element={<Balance/>} />


        <Route exact path ="/next" element ={<Next/>} />
        <Route exact path ="/notexist" element ={<NotExisting_login/>} />
        <Route exact path ="/email" element ={<EmailForm/>} />
        <Route exact path ="/admin_main" element ={<Admin_main/>} />
        <Route exact path ="/admin" element ={<AdminLoginComponent/>} />
        <Route exact path ="/create_account" element ={<Create_acc/>} />
        <Route exact path ="/account_created" element ={<Accountcreated/>} />
        <Route exact path ="/ask_account" element ={<Ask_account/>} />
        <Route exact path ="/showdetails" element ={<ShowDetails/>} />
        <Route exact path ="/unpaid" element ={<Unpaid/>} />
        <Route exact path ="/top3" element ={<Top3/>} />
        
    </Routes>
    </div>
  );
};

export default App;