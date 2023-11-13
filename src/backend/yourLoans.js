const express = require("express");
const cors = require("cors");
const db = require("./db");
const acc = require("./curr_account");

const urLoansRouter = express.Router();
urLoansRouter.use(cors());

urLoansRouter.post("/urLoans", (req, res) => {
    const accno = acc.value;

    const q = `SELECT * FROM LOAN WHERE ACC_NO = ?;`;

    db.query(q, [accno], (err, result) => {
        if (err) {
            console.log("Failed to execute query!");
            res.status(500).json({ error: 'Invalid credentials.' });
        }
        if (result.length === 0) {
            console.log("User doesn't have any loans");
            res.json({ accountno: -1 });
        } else {
            res.json(result);
            console.log(result);
        }
    });
});

module.exports = urLoansRouter;
