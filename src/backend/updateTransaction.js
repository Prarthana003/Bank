const express = require("express");
const cors = require("cors");
const db = require("./db");

const updateTransactionRouter = express.Router();

updateTransactionRouter.use(express.json());
updateTransactionRouter.use(cors());

updateTransactionRouter.post("/updates", (req, res) => {
  console.log('here');
  const accno = 4;
  const toaccno = req.body.toaccountno;
  const amount = req.body.amt;

  const q = `INSERT INTO transaction (amount, toAccno, type, timestamp, fromAcc, tdate) VALUES (?, ?, 'online', CURTIME(), ?, CURDATE())`;

  db.query(q, [amount, toaccno, accno], (err, result) => {
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
