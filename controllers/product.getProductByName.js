const Products = require('../models/Products')

exports.fetchProductsByName = async (req, res) => {
    try {
        const name = req.query.search
        const page = Number.parseInt(req.query.page)
        const limit = Number.parseInt(req.query.limit)
        const empty = req.query.empty
        if ((name === 'undefined' || name.length === 0) && empty === 'required') {
            const count = await Products.find().count()
            const products = await Products
                .find()
                .skip((page - 1) * limit)
                .limit(limit)
            res.status(200).json({ message: 'Products fetched successfully', products, count })
        } else if (name && name.length > 0) {
            const count = await Products.find({ name: { $regex: name, $options: 'i' } }).count()
            const products = await Products
                .find({ name: { $regex: name, $options: 'i' } })
                .skip((page - 1) * limit)
                .limit(limit)
            res.status(200).json({ message: 'Products fetched successfully', products, count })
        } else {
            res.status(200).json({ message: 'Products fetched successfully', products: [], count: 0 })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Something went wrong' })
    }
}