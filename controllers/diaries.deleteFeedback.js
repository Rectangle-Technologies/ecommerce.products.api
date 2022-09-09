const { default: mongoose } = require("mongoose");
const ClientDairies = require("../models/ClientDairies")

exports.deleteFeedback = async (req, res) => {
    const { uid } = req.params;
    if (mongoose.Types.ObjectId.isValid(uid)) {
        const feedback = await ClientDairies.findByIdAndDelete(uid);
        return res.json({
            success: true,
            message: "Client Diary entry deleted",
            feedback
        })
    } else {
        return res.status(404).json({
            message: "Feedback not found",
            errorMessage: "Invalid feedback identification"
        })
    }
}