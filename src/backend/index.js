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
const balance = require('./balance.js')
const applyLoan = require('./applyLoan.js')
const mail = require('./getMail.js')
const transactionstats = require('./stats/transaction.js')
const Delete_Account=require("./delete_acc.js");
const del_acc = require("./delete_acc.js");

const bodyParser = require('body-parser');
const updateBonus=require("./updateBonus.js");

const nodemailer = require('nodemailer')


const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

app.use(bodyParser.json());
app.use('/updateBonus',updateBonus);


var curr_account = require("./curr_account")



const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200, 
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
app.use('/loanPayment',loanPayRouter)
app.use('/updateLoan',loanUpdateRouter)
app.use('/createFD',createFdRouter)
app.use('/urFds',UrFdRouter)
app.use('/phno',dcPhno)
app.use('/otp',dcOtpRouter)
app.use('/verifyOtp',verify)
app.use('/balance',balance)
app.use('/appLoan',applyLoan)
app.use('/mail',mail)
app.use('/stats',transactionstats)
app.use('/del',del_acc)


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pes1202100596@pesu.pes.edu', // Replace with your Gmail email address
    pass: 'jjdr ufvc szko wtsq', // Replace with your application-specific password
  },
});




// Route to get all posts
app.post("/",(req,res)=>{
    res.send("HERE>>");
})
app.get("/next",(req,res)=>{
    res.send("IN NEXT PAGE");
})


app.post("/top3",(req,res)=>{


  // res.send("HERE>>GET");
  const q="select * from account where Current_Outstanding order by Current_Outstanding desc limit 3"
      // const q="select * from register_login natural join account";
  // const q="select * from login";
  
  // const q = 'SELECT * FROM login';

db.query(q, (err, result) => {
if (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Invalid credentials.' });
}
console.log(result); // Logging the query result to the console
if (result.length==0){
  console.log("Not existing")
  res.json(result);
}
else
res.json(result); }

)// 
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


app.post('/create_account', (req, res) => {
  const {
    city,
    First_Name,
    Last_Name,
    Door_No,
    Street,
    Aadhar_Number,
    Pan_Number,
    Driving_License,
    Phone_Number,
    Email_Address,
    MinDeposit,
    BranchCode
  } = req.body;

  let acc_id = 0;
  let cust_id = 0;
  let debit_id=0;
  console.log(First_Name, typeof Door_No);
  console.log(req.body);
  console.log(Email_Address);
  console.log(typeof(Email_Address));
  const customerQuery =
    "INSERT INTO customer(FirstName, LastName, DoorNo, Street, City, PanNo, AadharNo, DrivingLicense) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    customerQuery,
    [
      First_Name,
      Last_Name,
      parseInt(Door_No),
      Street,
      city,
      Pan_Number,
      Aadhar_Number,
      Driving_License
    ],
    (err, result) => {
      if (err) {
        console.error('Error executing MySQL query for customer:', err);
        res.status(500).json({ error: 'Error creating customer.' });
      } else {
        cust_id = result.insertId; // Get the customer ID generated by the database

        const accountQuery =
          "INSERT INTO account(Current_Outstanding, branch_code, credit_card_no,cust_id) VALUES (?, ?, ?, ?)";
        db.query(
          accountQuery,
          [MinDeposit, BranchCode, null,cust_id],
          (err, result1) => {
            if (err) {
              console.error('Error executing MySQL query for account:', err);
              res.status(500).json({ error: 'Error creating account.' });
            } else {
              acc_id = result1.insertId; // Get the account ID generated by the database

              const registerLoginQuery = 
                "INSERT INTO register_login(AccountNo, first_Name, username, password_t) VALUES (?, ?, ?, ?)";
              db.query(
                registerLoginQuery,
                [acc_id,First_Name, acc_id.toString(),acc_id.toString()],
                (err, result2) => {
                  if (err) {
                    console.error(
                      'Error executing MySQL query for register_login:',
                      err
                    );
                    res
                      .status(500)
                      .json({ error: 'Error creating register_login entry.' });
                  } else {
                    const currentDate = new Date();

                    const year = currentDate.getFullYear();
                    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
                    const day = String(currentDate.getDate()).padStart(2, '0');
                    const hours = String(currentDate.getHours()).padStart(2, '0');
                    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                    const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                    const formattedDate = `${year}-${month}-${day}`;
                    const formattedTime = `${hours}:${minutes}:${seconds}`;

                    const debitCardQuery = 
                      'INSERT INTO debitcard(account_no,pay_amount,ptime,tdate) VALUES (?,?,?,?)';
                    db.query(debitCardQuery, [acc_id,null,formattedTime,formattedDate], (err, result3) => {
                      if (err) {
                        console.error(
                          'Error executing MySQL query for debitcard:',
                          err
                        );
                        res
                          .status(500)
                          .json({ error: 'Error creating debitcard entry.' });
                      } else {
                        debit_id = result3.insertId;
                        const notificationquery="call Insert_notification(?,?,?)"
                        // "insert into notification values(?,?,?)"
                        db.query(notificationquery, [acc_id,Phone_Number,Email_Address], (err, result3) => {
                          if (err) {
                            console.error(
                              'Error executing MySQL query for debitcard:',
                              err
                            );
                            res
                              .status(500)
                              .json({ error: 'Error creating debitcard entry.' });
                          } 
                          else {
                            // console.log(result);
                            console.log(Email_Address);
                            console.log(typeof(Email_Address));
                          const mailOptions = {
                            from: 'pes1202100596@pesu.pes.edu',
                            to: Email_Address,
                            subject:"Account Creation with Eminent Bank",
                            text:"You have successfully registered in Eminent Bank. Your Account No is "+acc_id+".Debit Card No is "+debit_id+ "\\n.Login credentials :Username and password are your account number itself."
                          };
                          transporter.sendMail(mailOptions, (error, info) => {
                            if (error) {
                              console.error(error);
                              res.status(500).send('Error sending email');
                            } else {
                              console.log('Email sent: ' + info.response);
                              res.send({ "accountno":acc_id,"debitcardno":debit_id });
                              // res.send('Email sent successfully');
                            }
                          });
                            
                            
                            // res.send({ "accountno":acc_id,"debitcardno":debit_id });
                          }
                        });

                      }
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});





app.post('/send-email', (req, res) => {
  const { recipientEmail, subject, message } = req.body;
  
  
  const q="select email from notification "
  db.query(q,(err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Invalid credentials.' });
    }
    console.log(result); // Logging the query result to the console
    
    for (entry in result)
    {
      // console.log(result[entry]["email"]);
      // entry is index;
      
        console.log(result);
        const mailOptions = {
          from: 'pri2019senthil@gmail.com',
          to:result[entry]["email"],
          subject: subject,
          text:message
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error(error);
            res.status(500).send('Error sending email');
          } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
          }
        });
      
    }
      // res.send(result[0]); // Sending the query result as a JSON response
  });

});

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
  res.json(result); // Sending the query result as a JSON response
});

    // res.send({ message: 'Got' });
});

app.post("/adminlogin", (req,res)=>{
  // console.log(req);
  console.log("YAYY!");
  console.log(req.body);
  username=req.body.username;
  pass=req.body.password;

  console.log(username,pass)
  const q="select * from register_admin where username=? and password=?";
  

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
});

  // res.send({ message: 'Got' });
});


// app.get('/demo', async (req, res) => {
//   try {
//     const [rows, fields] = await db.query('SELECT * FROM login');
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.post("/show_d",(req,res)=>{

  console.log(req.data);
acc=Number(req.body.Account);
  console.log(acc);
  // res.send("HERE>>GET");
  const q=" select * from (select * from account where accountno=?)l inner join customer on customer.Cust_ID=l.cust_id"

db.query(q,[acc], (err, result) => {
if (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Invalid credentials.' });
}
console.log(result); // Logging the query result to the console
if (result.length==0){
  console.log("Not existing")
  res.json(result);
}
else
res.json(result); }

)// 
})

app.post("/show_fd",(req,res)=>{

  console.log(req.data);
acc=Number(req.body.Account);
  console.log(acc);
  // res.send("HERE>>GET");
  const q="select * from  (select * from fd natural join account_fd)temp where accountno=?"

db.query(q,[acc], (err, result) => {
if (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Invalid credentials.' });
}
console.log(result); // Logging the query result to the console
if (result.length==0){
  console.log("Not existing")
  res.json(result);
}
else
res.json(result); }

)// 
})
app.post("/show_loan",(req,res)=>{

  console.log(req.data);
acc=Number(req.body.Account);
  console.log(acc);
  // res.send("HERE>>GET");
  const q=" select * from loan where acc_no=?"

db.query(q,[acc], (err, result) => {
if (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Invalid credentials.' });
}
console.log(result); // Logging the query result to the console
if (result.length==0){
  console.log("Not existing")
  res.json(result);
}
else
res.json(result); }

)// 
})
app.post("/top3",(req,res)=>{


  // res.send("HERE>>GET");
  const q="select * from account where Current_Outstanding order by Current_Outstanding desc limit 3"
      // const q="select * from register_login natural join account";
  // const q="select * from login";
  
  // const q = 'SELECT * FROM login';

db.query(q, (err, result) => {
if (err) {
  console.error('Error executing MySQL query:', err);
  res.status(500).json({ error: 'Invalid credentials.' });
}
console.log(result); // Logging the query result to the console
if (result.length==0){
  console.log("Not existing")
  res.json(result);
}
else
res.json(result); }

)// 
})


app.post("/unpaid",(req,res)=>{


    // res.send("HERE>>GET");
    const q="select AccountNo,mobile,email from (notification inner join (select acc_no from (select * from (select lp.loan_id from loan_payment lp  where lp.loan_id in (select loanID  from loan l where l.toBePaid>=0.5* l.amount))lid inner join loan on loan.loanID=lid.loan_id) getacct) final on notification.AccountNo=final.acc_no)"
        // const q="select * from register_login natural join account";
    // const q="select * from login";
    
    // const q = 'SELECT * FROM login';

db.query(q, (err, result) => {
  if (err) {
    console.error('Error executing MySQL query:', err);
    res.status(500).json({ error: 'Invalid credentials.' });
  }
  console.log(result); // Logging the query result to the console
  if (result.length==0){
    console.log("Not existing")
    res.json(result);
  }
  else
  res.json(result); }

)// 
})




app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})



module.exports = db;