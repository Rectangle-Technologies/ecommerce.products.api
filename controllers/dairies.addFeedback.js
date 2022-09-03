const { default: mongoose } = require("mongoose");
const ClientDairies = require("../models/ClientDairies")

exports.addDairiesFeedback = async (req, res) => {
    req.body.imageUrl = "Processing";
    const dairies = await ClientDairies.create(req.body);
    return res.json({
        success: true,
        message: "Your feedback has been added.",
        id: dairies.id || dairies._id
    })
}

exports.addClientDairiesImage = async (req, res) => {
    if (req.file === undefined && req.files === undefined) {
        return res.status(400).json({
            success: false,
            message: "Image was not uploaded",
            errorMessage: "Image was not sent with API"
        })
    }
    const uid = req.params.uid;
    if (mongoose.Types.ObjectId.isValid(uid)) {
        ClientDairies.findById(uid)
        .then(async (dairy) => {
            if (dairy != null) {
                dairy.imageUrl = req.file.location;
                const updatedDairy = await dairy.save();
                return res.json({
                    success: true,
                    dairy: updatedDairy
                })
            } else {
                return res.status(404).json({
                    success: false,
                    message: "Feedback not found",
                    errorMessage: "Invalid feedback identification"
                })
            }
        })
        .catch((err) => {})
    } else {
        return res.status(404).json({
            message: "Feedback not found",
            errorMessage: "Invalid feedback identification"
        })
    }
}