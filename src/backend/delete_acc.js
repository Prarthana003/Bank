const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const Delete_Account = express.Router();

Delete_Account.use(express.json());
Delete_Account.use(cors());

Delete_Account.post('/delete_account', (req, res) => {
//   const acc = req.body.acc
  const acc=Number(req.body.Account);
  console.log(acc)
  const q = `
   call delete_account(?);
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
        
      }
    }
  });
});

module.exports = Delete_Account;