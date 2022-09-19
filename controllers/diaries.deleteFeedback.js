const { default: mongoose } = require("mongoose");
const ClientDairies = require("../models/ClientDairies")
const { s3 } = require('./image.uploader')

exports.deleteFeedback = async (req, res) => {
    const { uid } = req.params;
    if (mongoose.Types.ObjectId.isValid(uid)) {
        const feedback = await ClientDairies.findByIdAndDelete(uid);
        let key = feedback.imageUrl.split('/')[3]
        key = key.replaceAll("%2C", ",")
        await s3
            .deleteObject({ Bucket: "bloomdev", Key: key })
            .promise();
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