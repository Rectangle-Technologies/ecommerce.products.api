const CollaborateQueries = require("../models/CollaborateQueries");
const ExchangeQueries = require("../models/ExchangeQueries");
const ContactQueries = require("../models/ContactQueries");

exports.fetchTotalQueries = async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(401).json({ message: 'Not authorized!' })
    }
    try {
        const collabQueries = await CollaborateQueries.find().count()
        const exchangeQueries = await ExchangeQueries.find().count()
        const contactQueries = await ContactQueries.find().count()
        return res.status(200).json({ message: 'Queries count fetched successfully', collabQueries, exchangeQueries, contactQueries })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message || 'Something went wrong' })
    }
}