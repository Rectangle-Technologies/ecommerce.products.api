const CollaborateQueries = require("../models/CollaborateQueries")

exports.setStatusCompleted = async (req, res) => {
    const { uid } = req.params;
    const query = await CollaborateQueries.findById(uid);
    query.status = "Completed";
    await query.save();
    const queries = (await CollaborateQueries.find({ status: "Pending" })).map(doc => ({ id: doc._id, name: `${doc.first_name} ${doc.last_name}`, message: doc.message, email: doc.email, status: doc.status }))
    return res.json({
        success: true,
        messgae: "Pending request fetched",
        queries
    })
}