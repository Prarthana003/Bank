const express = require("express");
const cors = require("cors");
const newOtp = require('./checkotp.js');
const accno = require('./curr_account.js');
const db = require('./db.js');

const verifyRouter = express.Router();

verifyRouter.use(express.json());
verifyRouter.use(cors());

verifyRouter.post("/verify", (req, res) => {
  const otp = req.body.otp;
  const toaccno = req.body.toacc;
  const amount = req.body.amount; // Fix: use req.body.amount for the amount
  const acc = accno.value;

  const q = `SELECT TransferAmount(?, ?, ?);`;

  if (otp == newOtp.value) { // Fix: use newOtp.value instead of newOtp
    db.query(q, [acc, toaccno, amount], (err, result) => {
        console.log("accno ",acc,"to ",toaccno,"amt ",amount)
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Invalid credentials.' });
      } else {
        console.log("result ", result);
        if (result[0][0] === 1) {
          console.log("Transfer successful");
          res.send({ success: true });
        } else {
          console.log("Transfer failed");
          res.send({ success: false });
        }
      }
    });
  }
});

module.exports = verifyRouter;
