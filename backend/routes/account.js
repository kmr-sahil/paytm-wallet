const express = require("express")

const router = express.Router()

router.get("/balance", (req, res)=>{
    res.json({
        message: "360 balance"
    })
})

module.exports = router