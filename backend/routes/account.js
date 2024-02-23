const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")

const router = express.Router()

router.get("/balance", authMiddleware, async(req, res) => {

    const account = await Account.findOne({
        userId: req.userId
    })

    res.json({
        message: "here balance",
        balance: account.balance
    })
})

router.post("/transfer",authMiddleware, async(req, res) => {
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


})

module.exports = router