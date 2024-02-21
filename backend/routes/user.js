const express = require("express")
const zod = require("zod")
const { User } = require("../db")
const jwt = require("jsonwebtoken")
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


module.exports = router