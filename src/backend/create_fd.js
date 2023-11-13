const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const createFdRouter = express.Router();

createFdRouter.use(express.json());
createFdRouter.use(cors());
createFdRouter.post('/createFds', (req, res) => {
    const account = accno.value
    // const account = 4
    const amount = req.body.amount
    const time = req.body.time
    const nominee = req.body.nominee
    const q = `
      call fd(?,?,?,?);
    `;
  
    db.query(q, [account,amount,time,nominee], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Invalid credentials.' });
      } else {
        console.log("result ",result)
        if (result[0][0] === 1) {
          console.log("Transfer successful");
          res.send({ success: true });
        } else {
          console.log("Transfer failed");
          res.send({ success: false });
        }
      }
    });
  });
  

module.exports = createFdRouter;
