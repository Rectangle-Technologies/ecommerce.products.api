const Products = require("../models/Products");

exports.getLatestProducts = async (req, res) => {
    const products = await Products.find({ $and: [{ 'launch_time': { $lte: new Date() } }, { status: 'Published' }] }).sort({ "createdAt": "desc" }).limit(12);
    return res.json({
        success: true,
        message: "Products fetched",
        products
    })
}