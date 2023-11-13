const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account");

const transactionRouter = express.Router();

transactionRouter.use(express.json());
transactionRouter.use(cors());

transactionRouter.post('/transactions', (req, res) => {
  const accountNo = accno.value;
  const q = `
    SELECT * FROM TRANSACTION
    WHERE FROMACC = ?
    ORDER BY TDATE DESC; 
  `;

  db.query(q, [accountNo], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("result", result);
      res.json(result);
    }
  });
});

module.exports = transactionRouter;
