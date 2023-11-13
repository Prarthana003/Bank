const mysql= require("mysql2")
const express=require("express")
const beneficiaryRouter = require('./beneficiary.js');
const transactionRouter = require('./transaction.js')
const addBenRouter=  require('./addBeneficiary.js')
const updateTransactionRouter = require('./updateTransaction.js')
const urLoansRouter = require('./yourLoans.js')
const urtransactionRouter = require('./urTransactions.js')
const loanPayRouter = require('./loanPayment.js')
const loanUpdateRouter = require('./loanUpdateAccount.js')
const createFdRouter = require('./create_fd.js')
const UrFdRouter = require('./UrFd.js')
const dcOtpRouter = require('./dcOtp.js')
const dcPhno = require('./getphno.js')
const verify = require('./verifyOtp.js')



const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());


var curr_account = require("./curr_account")



const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };
  
  app.use(cors(corsOptions));
  
  const db = require("./db");


const  PORT = 4000;
// app.use(cors());
app.use(express.json());

app.use('/beneficiary', beneficiaryRouter);
app.use('/transaction', transactionRouter);
app.use('/addben',addBenRouter);
app.use('/updateTransaction',updateTransactionRouter);
app.use('/yourLoans',urLoansRouter);
app.use('/urTransactions',urtransactionRouter);
app.use('/loanPay',loanPayRouter)
app.use('/updateLoan',loanUpdateRouter)
app.use('/createFD',createFdRouter)
app.use('/urFds',UrFdRouter)
app.use('/phno',dcPhno)
app.use('/otp',dcOtpRouter)
app.use('/verifyOtp',verify)





// Route to get all posts
app.post("/",(req,res)=>{
    res.send("HERE>>");
})
app.get("/next",(req,res)=>{
    res.send("IN NEXT PAGE");
})
app.post("/logged_in", (req,res)=>{
    // console.log(req);
    console.log("YAYY!");
    console.log(req.body);
    username=req.body.username;
    pass=req.body.password;

    console.log(username,pass)
    const q="select * from register_login where username=? and password_t=?";
    

out=[];
    // const q = 'SELECT * FROM login';

db.query(q,[username,pass], (err, result) => {
  if (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Invalid credentials.' });
  }
  console.log(result); // Logging the query result to the console
  if (result.length==0){
    console.log("Not existing")
    res.send({accountno:-1});
  }
  else
  res.send(result[0]); // Sending the query result as a JSON response
  curr_account.set(result[0]["AccountNo"]);
  console.log(curr_account.value);
  });

    // res.send({ message: 'Got' });
});
app.get("/",(req,res)=>{
    res.send("HERE>>GET");
})
app.get("/logged_in", (req,res)=>{
    console.log(req);
    res.send("SUCCESS  GET");
});




app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})



module.exports = db;