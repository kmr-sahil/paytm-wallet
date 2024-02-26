const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")

const router = express.Router()

router.get("/balance", authMiddleware, async(req, res) => {

    try {
        const account = await Account.findOne({
            userId: req.userId
        })
    
        res.json({
            message: "here balance",
            balance: account.balance
        })
    } catch (error) {
        console.error("Error in getting balance:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }

    
})

router.post("/transfer",authMiddleware, async(req, res) => {
    try {
        
        const session = await mongoose.startSession()

        session.startTransaction()
        const {to, amount} = req.body
    
        const account = await Account.findOne({userId: req.userId}).session(session)
    
        if(!account || account.balance < amount) {
            await session.abortTransaction()
            res.status(400).json({
                message: "Insufficient balance"
            })
        }
    
        const toAccount = await Account.findOne({userId: to}).session(session)
    
        if(!toAccount){
            await session.abortTransaction()
            res.status(400).json({
                message: "Invalid account"
            })
        }
    
        await Account.findOneAndUpdate({userId: req.userId}, { $inc: {
            balance: -amount
        }}).session(session)
    
        await Account.findOneAndUpdate({userId: to}, { $inc: {
            balance: amount
        }})
    
        await session.commitTransaction()
    
        res.status(200).json({
            message: "Transfer successfull"
        })

    } catch (error) {
        console.error("Error in transfer:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }



})

module.exports = router