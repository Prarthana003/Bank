const express = require("express");
const cors = require("cors");
const db = require('./db');
const acc = require('./curr_account');

const getPHno = express.Router();

getPHno.use(express.json());
getPHno.use(cors());

getPHno.post('/getphno', async (req, res) => {
    const accountNumber = acc.value;

    const query = `select emailid from dc where account_No = ?;`;

    db.query(query, [accountNumber], (error, result) => {
        if (error) {
            console.error('Error executing the query:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        } else {
            // Assuming there's only one result, you might want to check the result array length
            const mailid = result[0] ? result[0].phno : null;
            
            if (mailid) {
                res.status(200).json({ success: true, mailid });
            } else {
                res.status(404).json({ success: false, message: 'Phone number not found' });
            }
        }
    });
});

module.exports = getPHno;
