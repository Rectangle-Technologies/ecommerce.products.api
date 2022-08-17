const Products = require("../models/Products");
const mongoose = require("mongoose");

exports.fetchDetails = async (req, res) => {
    const pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
        const product = await Products.findById(pid);
        if (product) {
            return res.json({product, message: "Product details found"});
        }
        return res.status(404).json({
            product: "Product not found"
        })
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}