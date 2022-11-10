const Products = require("../models/Products");

exports.getLatestProducts = async (req, res) => {
    const products = await Products.find({ 'launch_time': { $lte: new Date() } }).sort({ "createdAt": "desc" }).limit(12);
    return res.json({
        success: true,
        message: "Products fetched",
        products
    })
}