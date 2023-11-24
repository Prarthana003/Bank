const express = require("express");
const db = require("./db");
const cors = require("cors");

const accno = require("./curr_account")

const UpdateBonus= express.Router();

UpdateBonus.use(express.json());
UpdateBonus.use(cors());
UpdateBonus.post('/enable_bonus', (req, res) => {
    //const from = req.body.from;
    const from = accno.value
    const percent = parseFloat(req.body.percent);
    console.log(typeof(percent));
   
    const q = `
     update employee
     set salary=salary+(salary*(?/100));
    `;
  
    db.query(q, [percent], (err, result) => {
      if (err) {
        console.error('Error executing MySQL query:', err);
        res.status(500).json({ error: 'Invalid credentials.' });
      } else {
          console.log("Enabled bonus");
          res.send({ success: true });
        
      }
    });
  });
  

module.exports = UpdateBonus;