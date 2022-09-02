const ContactQueries = require("../models/ContactQueries")

exports.pendingContactQueries = async (req, res) => {
    const queries = await (await ContactQueries.find({ status: {$in: ["Pending", "In Queue"]} })).map(doc => ({ id: doc._id, name: doc.name, message: doc.message, email: doc.email, status: doc.status }))
    res.json({
        success: true,
        messgae: "Pending request fetched",
        queries
    })
}