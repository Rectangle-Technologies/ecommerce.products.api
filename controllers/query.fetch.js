const CollaborateQueries = require("../models/CollaborateQueries");
const ExchangeQueries = require("../models/ExchangeQueries");
const ContactQueries = require("../models/ContactQueries");

exports.fetchTotalQueries = async (req, res) => {
    if (req.user.type !== 'admin') {
        return res.status(401).json({ message: 'Not authorized!' })
    }
    try {
        const collabQueries = await CollaborateQueries.find({ status: 'Pending' }).count()
        const exchangeQueries = await ExchangeQueries.find({ status: 'Pending' }).count()
        const contactQueries = await ContactQueries.find({ $or: [{ status: 'In Queue' }, { status: 'Pending' }] }).count()
        return res.status(200).json({ message: 'Queries count fetched successfully', collabQueries, exchangeQueries, contactQueries })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message || 'Something went wrong' })
    }
}