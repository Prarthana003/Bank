const express = require("express")
const cors = require("cors")
const db = require('../db')



const TransactionStats = express.Router();

TransactionStats.use(express.json());
TransactionStats.use(cors());

TransactionStats.get('/transactions', (req, res) => {
    console.log("in backend")
  const q = `
  SELECT fromAcc AS accountNo, COUNT(transaction_id) AS transactionCount
    FROM transaction
    GROUP BY fromAcc;
  `;

  db.query(q, [], (err, result) => {
    console.log(result)
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      console.log("result", result);
      res.send(result);
    }
  });
});

module.exports = TransactionStats;