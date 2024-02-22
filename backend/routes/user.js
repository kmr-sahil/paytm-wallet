const express = require("express")
const zod = require("zod")
const { User } = require("../db")
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");
require('dotenv').config();

const router = express.Router()

const signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string()
})

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
        const {success} = signupSchema.safeParse(req.body)
       
        if(!success){
            return res.status(411).json({
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
        const token = jwt.sign({
            userId: newUser._id,
    
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

        await User.updateOne(req.body, {
            id: req.userId
        })
    
        res.json({
            message: "Updated successfully"
        })
        
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ error: error.message || "Internal Server Error" });
    }
    
})

router.get("/bulk", async (req, res) => {
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
})


module.exports = router