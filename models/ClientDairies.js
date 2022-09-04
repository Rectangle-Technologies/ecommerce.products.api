const mongoose = require("mongoose");

const ClientDairiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("ClientDairy", ClientDairiesSchema);