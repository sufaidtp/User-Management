const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/new")
    .then(() => console.log("connected"))
    .catch((e) => console.log("mongodb error" + e))

const user = mongoose.Schema({
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: true
    }
});

const userDetails = new mongoose.model("user", user)
module.exports = userDetails
