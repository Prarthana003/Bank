const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const transactionRouter = express.Router();

transactionRouter.use(express.json());
transactionRouter.use(cors());
transactionRouter.post('/transactions', (req, res) => {
    //const from = req.body.from;
    const from = accno.value
    const to = req.body.toAccountNo;
    const amt = req.body.amt;
    const q = `
      SELECT TransferAmount(?, ?, ?);
    `;
  
    db.query(q, [from, to, amt], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Invalid credentials.' });
      } else {
        console.log("result ",result)
        const s = "TransferAmount("+from+", '"+to+"', "+amt+")"
        console.log(s)
        console.log("1- ",result[0][s])
        console.log("2- ",result[s])
        if (result[0][s] === 1) {
          
          console.log("Transfer successful");
          res.send({ success: true });
          
        } else {
          console.log("Transfer failed");
          res.send({ success: false });
          
        }
      }
    });
  });
  

module.exports = transactionRouter;




