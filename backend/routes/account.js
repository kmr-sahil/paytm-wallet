const express = require("express")
const { authMiddleware } = require("../middleware")
const { Account } = require("../db")
const { default: mongoose } = require("mongoose")
const zod = require("zod")

const router = express.Router()

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number().int().positive()  // Ensure the number is positive
});

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

router.post("/transfer", authMiddleware, async (req, res) => {
    let session;
    try {
        session = await mongoose.startSession();
        session.startTransaction();
        const { to, amount: amountStr } = req.body; // Extract amount as string
        const amount = parseFloat(amountStr); // Parse amount as a float
        const { success } = transferSchema.safeParse({ to, amount }); // Validate { to, amount }

        if (!success) {
            await session.abortTransaction();
            return res.status(400).json({
                message: "Invalid transfer data"
            });
        }

        const account = await Account.findOne({userId: req.userId}).session(session)
        const toAccount = await Account.findOne({userId: to}).session(session)

        if(!account || account.balance < amount) {
            await session.abortTransaction()
            return res.status(400).json({
                message: "Insufficient balance"
            })
        }

        if(!toAccount){
            await session.abortTransaction()
            return res.status(400).json({
                message: "Invalid account"
            })
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction()

        res.status(200).json({
            message: "Transfer successfull"
        })
    } catch (error) {
        console.error("Error in transfer:", error)
        
        await session.abortTransaction()
        
        res.status(500).json({ error: error.message || "Internal Server Error" })
    }
})


module.exports = router