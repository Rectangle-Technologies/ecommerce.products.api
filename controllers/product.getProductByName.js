const Products = require('../models/Products')

exports.fetchProductsByName = async (req, res) => {
    try {
        const name = req.query.search
        const products = await Products.find({ name: { $regex: name, $options: 'i' } })
        res.status(200).json({ message: 'Products fetched successfully', products })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}