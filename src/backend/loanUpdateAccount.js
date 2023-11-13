const express = require("express")
const cors = require("cors")

const db = require("./db")
const accno = require("./curr_account")

const makePaymentRouter = express.Router()

makePaymentRouter.use(express.json())
makePaymentRouter.use(cors)


makePaymentRouter.post('/payloan',(req,res)=>{
    console.log("hereeeeeee")
    const acc = accno.value
    const amount = req.body.amount
    const q =`SELECT update_currentout_loan(?,?);`

    db.query(q,[acc,amount],(error,res)=>{
        if(error)
            {
                console.log("error occured!")
            }
        else if(res[0][0]==1){
            console.log("Successful update!")
        }
        else{
            console.log("User not found!")
        }
    })
    
})

module.exports = makePaymentRouter