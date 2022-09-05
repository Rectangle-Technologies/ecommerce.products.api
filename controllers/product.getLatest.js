const Products = require("../models/Products");

exports.getLatestProducts = async (req, res) => {
    const products = await Products.find().sort({"createdAt": "desc"}).limit(12);
    return res.json({
        success: true,
        message: "Products fetched",
        products
    })
}