const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const appLoan = express.Router();

appLoan.use(express.json());
appLoan.use(cors());
appLoan.post('/loan', (req, res) => {
    const account = accno.value
    const amount = req.body.principal
    const time = req.body.time
    const q = `
    call apploan(?,?,?);
    `;
  
    db.query(q, [account,amount,time], (err, result) => {
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
  

module.exports = appLoan;
