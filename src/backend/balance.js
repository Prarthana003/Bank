const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const balanceRouter = express.Router();

balanceRouter.use(express.json());
balanceRouter.use(cors());

balanceRouter.get('/balance', (req, res) => {
    console.log("hereeee")
  //const acc = req.body.acc
  const acc = accno.value
  console.log(acc)
  const q = `
    select current_outstanding from account
    where accountno = ?
    
  `;

  db.query(q, [acc], (err, result) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).json({ error: 'Invalid credentials.' });
    } else {
      if (result.length === 0) {
        console.log("Not existing");
        res.send({ accountno: -1 });
      } else {
        res.send(result);
        console.log(result);
      }
    }
  });
});

module.exports = balanceRouter;
