const ExchangeQueries = require("../models/ExchangeQueries")

exports.pendingExchangeQueries = async (req, res) => {
    const queries = (await ExchangeQueries.find({ status: "Pending" }))
    .map(doc => ({ 
        id: doc._id, 
        order_id: doc.order_id,
        message: doc.message, 
        email: doc.email, 
        status: doc.status 
    }))
    res.json({
        success: true,
        messgae: "Pending request fetched",
        queries
    })
}