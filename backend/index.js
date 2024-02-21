const express = require("express");
const cors = require("cors")

const mainRouter = require("./routes/index")

const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1", mainRouter)

app.listen(8000, () => {
    console.log("listenning to port 8000")
})
