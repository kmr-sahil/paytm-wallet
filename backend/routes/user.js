const express = require("express")
const zod = require("zod")
const { User, Account } = require("../db")
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
require('dotenv').config();

const router = express.Router()

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string().min(3),
    firstName: zod.string().min(1),
    lastName: zod.string()
}).strict()

const signinSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
})

router.post("/signup", async (req, res)=>{
    try {
        const body = req.body
        const { success} = signupSchema.safeParse(req.body);
       
        if(!success){
            return res.status(400).json({
                message: "Email taken / Incorrect inputs"
            })
        }
    
        const user = await User.findOne({
            username: body.username,
        })
    
        if(user){
            return res.status(411).json({
                message: "User already registered"
            })
        }
    
        const newUser = await User.create(body)
        const userId = newUser._id

        await Account.create({
            userId,
            balance: Math.floor(Math.random() * 10000)
        })

        const token = jwt.sign({
            userId,
    
        }, process.env.JWT_SECRET)

    
        res.status(200).json({
            message: "User created",
            token: token
        })

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }

    
})

router.post("/signin", async (req, res)=>{

    try {
        const body = req.body
        const {success} = signinSchema.safeParse(req.body)

    if(!success) {
        return res.status(411).json({
            message: "Email taken / Incorrect inputs"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if(user){
        const token = jwt.sign({
            userId: user._id
        }, process.env.JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    } else {
        res.status(411).json({
            message: "username or password is wrong"
        })
        return;
    }


    } catch (error) {
        console.error("Error in signin:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }


})

router.put("/update", authMiddleware, async (req, res) => {
    try {
        const body = req.body
        const {success} = updateSchema.safeParse(req.body)
    
        if(!success) {
            return res.status(411).json({
                message: "Incorrect Inputs"
            })
        }

        console.log(req.userId)
        console.log(req.body)

        await User.findOneAndUpdate({
            _id: req.userId
        }, req.body)
    
        res.json({
            message: "Updated successfully"
        })
        
    } catch (error) {
        console.error("Error in update:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
    
})

router.get("/bulk", authMiddleware, async (req, res) => {
    try {
        const filter = req.query.filter || ""

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }
        ]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
    } catch (error) {
        console.error("Error in getting users:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
    
})

router.get("/verifyme", authMiddleware, async(req, res) => {
    try {
        const isValid = await User.findOne({_id: req.userId})

        if(!isValid) {
            return res.status(411).json({
                user: ""
            })
        }

        res.status(200).json({
            user: isValid.username,
        })

        return


    } catch (error) {
        console.error("Error in verifying user:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
})


module.exports = router