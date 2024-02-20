const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.json({
        message: "Helo live"
    })
})

app.listen(8000, () => {
    console.log("listenning to port 8000")
})
