const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const loanPaymentRouter = express.Router();

loanPaymentRouter.use(express.json());
loanPaymentRouter.use(cors());
loanPaymentRouter.post('/loanPayments', (req, res) => {
    const acc= accno.value
    const loanId = req.body.loanId
    const amount = req.body.amount

    const q = `
      call loan_connect(?,?,?) ;
    `;
  

    db.query(q, [amount,loanId,acc], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Invalid credentials.' });
      } else {
        console.log("result ",result)
        if (result[0][0] === 1) {
          console.log("Transfer successful");
          res.send({ success: true });
        } else {
          console.log("Transfer failed");
          res.send({ success: false });
        }
      }
    });
  });
  

module.exports = loanPaymentRouter;
