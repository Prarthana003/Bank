const express = require("express");
const cors = require("cors");
const db = require("./db");
const acc = require('./curr_account')
const updateTransactionRouter = express.Router();

updateTransactionRouter.use(express.json());
updateTransactionRouter.use(cors());

updateTransactionRouter.post("/updates", (req, res) => {
  console.log('here');
  const accno = acc.value;
  const toaccno = req.body.toaccountno;
  const amount = req.body.amt;
  const flag = req.body.flag;
  const type = req.body.type;
  console.log("flag ",flag)

  // var  q =``;
  // if(flag == 1)
  //   var q = `INSERT INTO transaction (amount, toAccno, type, timestamp, fromAcc, tdate) VALUES (?, ?,"debit", CURTIME(), ?, CURDATE())`;
  // else
  //   var q = `INSERT INTO transaction (amount, toAccno, type, timestamp, fromAcc, tdate) VALUES (?, ?,"online", CURTIME(), ?, CURDATE())`;

  const q = `INSERT INTO transaction (amount, toAccno, type, timestamp, fromAcc, tdate) VALUES (?, ?,?, CURTIME(), ?, CURDATE())`;


  db.query(q, [amount, toaccno,type, accno], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'An error occurred while inserting data.' });
    } else {
      if (result.affectedRows === 1) {
        console.log('Insert successful');
        res.send({ success: true });
      } else {
        console.log('Insert failed');
        res.send({ success: false });
      }
    }
  });
});

module.exports = updateTransactionRouter;
