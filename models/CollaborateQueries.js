const mongoose = require("mongoose");

const ContactQuerySchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
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
        enum: ["Completed","Pending"],
        default: "In Queue"
    }
})

module.exports = mongoose.model("CollaborationQuery", ContactQuerySchema);