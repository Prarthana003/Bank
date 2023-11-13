const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const beneficiaryRouter = express.Router();

beneficiaryRouter.use(express.json());
beneficiaryRouter.use(cors());

beneficiaryRouter.post('/getBeneficiaries', (req, res) => {
  //const acc = req.body.acc
  const acc = accno.value
  console.log(acc)
  const q = `
    SELECT toname, toAccountno
    FROM beneficiary
    WHERE accountno IN (
      SELECT accountno
      FROM beneficiary
      WHERE accountno = ?
    )
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

module.exports = beneficiaryRouter;
