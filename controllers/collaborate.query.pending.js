const CollaborateQueries = require("../models/CollaborateQueries")

exports.pendingCollabQueries = async (req, res) => {
    const queries = (await CollaborateQueries.find({ status: "Pending" }))
    .map(doc => ({ 
        id: doc._id, 
        name: `${doc.first_name} ${doc.last_name}`, 
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