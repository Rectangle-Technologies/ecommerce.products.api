const mongoose = require("mongoose");

const ContactQuerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Completed", "In Queue", "Pending"],
        default: "In Queue"
    }
})

module.exports = mongoose.model("ContactQuery", ContactQuerySchema);