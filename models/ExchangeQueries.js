const mongoose = require("mongoose");

const ExchangeQueriesSchema = new mongoose.Schema({
    order_id: {
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
        default: "Pending"
    }
})

module.exports = mongoose.model("ExchangeQuery", ExchangeQueriesSchema);