const Products = require("../models/Products");
const mongoose = require("mongoose");
const { validateProductDeatils } = require("./product.createProduct");

exports.updateProduct = async (req, res) => {
    const pid = req.params.pid;
    if (mongoose.Types.ObjectId.isValid(pid)) {
        const product = await Products.findByIdAndUpdate(pid, req.body);
        if (product != null) return res.json({
            success: true,
            message: "Product updated",
            product
        })
        else return res.status(404).json({
            success: false,
            errorMessage: "Product not found",
        })
    } else {
        return res.status(404).json({
            message: "Product not found",
            errorMessage: "Invalid product identification"
        })
    }
}


exports.validateProductData = validateProductDeatils;