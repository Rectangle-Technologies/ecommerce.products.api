const ClientDairies = require("../models/ClientDairies")

exports.getLatest = async (req, res) => {
    const diary = await ClientDairies.find().sort({"createdAt": "desc"}).limit(12);
    return res.json({
        success: true,
        message: "Client feedback fetched",
        diary
    })
}