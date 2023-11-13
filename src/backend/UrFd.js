const express = require("express")
const cors = require("cors")
const db = require('./db')


const accno = require("./curr_account");

const UrFdRouter = express.Router();

UrFdRouter.use(express.json());
UrFdRouter.use(cors());

UrFdRouter.post('/UrFds', (req, res) => {
  const accountNo = accno.value;
  const q = `
  SELECT fd.fd_id, fd.principal, fd.interest, fd.openingDate, fd.closingDate, fd.amount
  FROM fd
  INNER JOIN account_fd AS a ON fd.fd_id = a.fd_id
  WHERE a.accountNo = ?;
  
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

module.exports = UrFdRouter;