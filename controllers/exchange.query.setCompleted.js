const ExchangeQueries = require("../models/ExchangeQueries");

exports.setStatusCompleted = async (req, res) => {
    const { uid } = req.params;
    const query = await ExchangeQueries.findById(uid);
    query.status = "Completed";
    await query.save();
    const queries = (await ExchangeQueries.find({ status: "Pending" })).map(doc => ({ id: doc._id, order_id: doc.order_id, message: doc.message, email: doc.email, status: doc.status }))
    return res.json({
        success: true,
        messgae: "Pending request fetched",
        queries
    })
}