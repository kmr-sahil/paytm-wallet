const express = require("express")
const userRouter = require("./user")
const accountRouter = require("./account")

const router = express.Router()

router.use("/user", userRouter)
router.use("/account", accountRouter)


router.get("/test", (req, res)=>{
    res.json({
        message: "you are in api v1"
    })
})

module.exports = router