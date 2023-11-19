const express = require("express");
const cors = require("cors");
const db = require('./db');
const acc = require('./curr_account');

const getPHno = express.Router();

getPHno.use(express.json());
getPHno.use(cors());

getPHno.post('/getphno', async (req, res) => {
    console.log("in getphno")
    const accountNumber = acc.value;

    const q = `select email from notification where accountNo = ?;`;

    db.query(q, [accountNumber], (err, result) => {
        console.log("result = ",result)
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

module.exports = getPHno;
