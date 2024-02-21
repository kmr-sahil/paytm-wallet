require('dotenv').config();
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL)

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
})

const User = mongoose.model("User", userSchema)

module.exports = {
    User
}