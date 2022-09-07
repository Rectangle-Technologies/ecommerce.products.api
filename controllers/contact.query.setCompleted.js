const ContactQueries = require("../models/ContactQueries")

exports.setStatusCompleted = async (req, res) => {
    const { uid } = req.params;
    const query = await ContactQueries.findById(uid);
    query.status = "Completed";
    await query.save();
    const queries = (await ContactQueries.find({ status: {$in: ["Pending", "In Queue"]} })).map(doc => ({ id: doc._id, name: doc.name, message: doc.message, email: doc.email, status: doc.status }))
    return res.json({
        success: true,
        messgae: "Pending request fetched",
        queries
    })
}