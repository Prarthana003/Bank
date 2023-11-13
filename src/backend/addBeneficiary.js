const express = require("express");
const db = require("./db");
const cors = require("cors");
const accno = require("./curr_account");

const addBenRouter = express.Router();
addBenRouter.use(cors());

addBenRouter.post("/addBeneficiary", (req, res) => {
    const acc = accno.value;
    const name = req.body.name;
    const benAcc = req.body.benAcc;
    const benName = req.body.benName;

    const q = `INSERT INTO beneficiary (accountNo, fname, toAccountNo, toname) VALUES (?, ?, ?, ?)`;
    console.log(acc, name, benAcc, benName);
    db.query(q, [acc, name, benAcc, benName], (err, result) => {
        
        if (err) {
            console.log("Failed to execute query, invalid credentials");
            res.send({ success: false });
        } else {
            console.log("Successfully added!");
            res.send({ success: true });
        }
    });
});

module.exports = addBenRouter;
