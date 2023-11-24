const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const loanPaymentRouter = express.Router();

loanPaymentRouter.use(express.json());
loanPaymentRouter.use(cors());
loanPaymentRouter.post('/loanPayments', (req, res) => {
    console.log("loan payments")
    const acc= accno.value
    const loanId = req.body.loanId
    const amount = req.body.amount
    let  tobe_paid=0

    const q1 = `select tobepaid from loan where loanId = ?`
    db.query(q1,[loanId],(err,result)=>{
      tobe_paid= result[0]["tobepaid"]
      console.log(result)
      console.log(tobe_paid)
      if (amount>tobe_paid)
      {
        res.status(500).json({ error: 'Invalid credentials.' });
        console.log("here in if")
      }
      else
      {
            const q = `
            call loan_connect(?,?);
          `;
        
            db.query(q, [amount,loanId], (err, result) => {
              console.log(result)
              if (err) {
                console.error('Error executing MySQL query:', err);
                res.status(500).json({ error: 'Invalid credentials.' });
              } else {
                console.log("result ",result)
                if (result[0]=== 1) {
                  console.log("Transfer successful");
                  res.send({ success: true });
                } else {
                  console.log("Transfer failed");
                  res.send({ success: false });
                }
              }
            });
          }
  
        }
    




    )
    
  

      
  
      

      });
  

module.exports = loanPaymentRouter;
